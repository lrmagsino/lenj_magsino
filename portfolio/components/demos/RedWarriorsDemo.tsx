"use client";

import { useMemo, useState, type ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  category: "Meals" | "Sides" | "Drinks";
  price: number;
  stock: number;
  icon: string;
  description: string;
};

type OrderLine = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

type OrderStatus = "Pending" | "Preparing" | "Ready" | "Completed" | "Cancelled";

type DemoOrder = {
  id: string;
  queue: number;
  customer: string;
  lines: OrderLine[];
  total: number;
  status: OrderStatus;
};

type DemoTransaction = {
  id: string;
  label: string;
  kind: "AOS order" | "Walk-in sale";
  lines: OrderLine[];
  total: number;
};

const initialProducts: Product[] = [
  { id: "burger", name: "Burger", category: "Meals", price: 85, stock: 12, icon: "🍔", description: "Grilled patty · classic" },
  { id: "chicken", name: "Fried chicken", category: "Meals", price: 115, stock: 10, icon: "🍗", description: "Crispy chicken · rice" },
  { id: "rice-meal", name: "Rice meal", category: "Meals", price: 95, stock: 9, icon: "🍛", description: "Warm rice · daily special" },
  { id: "fries", name: "French fries", category: "Sides", price: 55, stock: 14, icon: "🍟", description: "Golden · shareable" },
  { id: "sandwich", name: "Sandwich", category: "Sides", price: 65, stock: 8, icon: "🥪", description: "Toasted · savory" },
  { id: "soft-drink", name: "Soft drink", category: "Drinks", price: 35, stock: 18, icon: "🥤", description: "Chilled · 330 ml" },
  { id: "water", name: "Bottled water", category: "Drinks", price: 25, stock: 20, icon: "💧", description: "Purified · 500 ml" },
];

const money = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 2,
});

const categories = ["All", "Meals", "Sides", "Drinks"] as const;
type Category = (typeof categories)[number];
type Phone = "aos" | "pos";
type PosTab = "orders" | "walk-in" | "summary";

function formatPrice(value: number) {
  return money.format(value);
}

function nextStatus(status: OrderStatus): OrderStatus | null {
  if (status === "Pending") return "Preparing";
  if (status === "Preparing") return "Ready";
  if (status === "Ready") return "Completed";
  return null;
}

function PhoneFrame({
  app,
  title,
  children,
}: {
  app: "AOS" | "POS";
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={`${app} ${title} phone`}
      className="mx-auto min-w-0 w-full max-w-[390px] rounded-[2.4rem] border-[7px] border-[#302b2b] bg-[#171719] p-2 shadow-[0_28px_70px_-35px_rgba(0,0,0,.8)]"
    >
      <div className="flex h-[min(740px,78vh)] min-h-[580px] flex-col overflow-hidden rounded-[1.85rem] bg-[#f7f5f2] text-[#292526]">
        <div className="flex h-7 shrink-0 items-center justify-between bg-[#f7f5f2] px-5 font-mono text-[10px] text-[#292526]/65">
          <span>9:41</span>
          <span aria-hidden="true">● ● ▰</span>
        </div>
        <header className="flex shrink-0 items-center justify-between border-b border-[#e6e1de] px-4 py-3">
          <div className="min-w-0">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-[#9b2638]">
              Red Warriors · {app} demo
            </p>
            <h3 className="mt-0.5 truncate font-display text-base font-bold">{title}</h3>
          </div>
          <span
            aria-hidden="true"
            className="ml-3 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#9b2638] text-xs font-bold text-white"
          >
            RW
          </span>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4">
          {children}
        </div>
        <div className="shrink-0 border-t border-[#e6e1de] px-3 py-2 text-center font-mono text-[9px] text-[#625a58]">
          SAMPLE DATA · NO REAL ORDERS
        </div>
      </div>
    </section>
  );
}

function PhoneTabs({
  items,
  value,
  onChange,
  label,
}: {
  items: readonly string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="grid gap-1 rounded-xl bg-[#eeeae7] p-1"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={value === item}
          onClick={() => onChange(item)}
          className={`min-h-10 rounded-lg px-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b2638] ${
            value === item
              ? "bg-white text-[#9b2638] shadow-sm"
              : "text-[#625a58] hover:text-[#9b2638]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function StatusPill({ status }: { status: OrderStatus }) {
  const color =
    status === "Completed"
      ? "bg-emerald-100 text-emerald-800"
      : status === "Cancelled"
        ? "bg-[#eeeae7] text-[#625a58]"
        : status === "Ready"
          ? "bg-sky-100 text-sky-800"
          : status === "Preparing"
            ? "bg-amber-100 text-amber-900"
            : "bg-rose-100 text-[#9b2638]";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold ${color}`}>
      {status}
    </span>
  );
}

export default function RedWarriorsDemo() {
  const [products, setProducts] = useState(initialProducts);
  const [aosCart, setAosCart] = useState<Record<string, number>>({});
  const [walkInCart, setWalkInCart] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [transactions, setTransactions] = useState<DemoTransaction[]>([]);
  const [phone, setPhone] = useState<Phone>("aos");
  const [aosTab, setAosTab] = useState<"Menu" | "Cart">("Menu");
  const [posTab, setPosTab] = useState<PosTab>("orders");
  const [category, setCategory] = useState<Category>("All");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [nextOrderNumber, setNextOrderNumber] = useState(1);
  const [nextSaleNumber, setNextSaleNumber] = useState(1);
  const [notice, setNotice] = useState("");
  const [receipt, setReceipt] = useState<DemoTransaction | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const cartTotal = useMemo(
    () =>
      Object.entries(aosCart).reduce((total, [id, quantity]) => {
        const product = products.find((item) => item.id === id);
        return total + (product?.price ?? 0) * quantity;
      }, 0),
    [aosCart, products],
  );
  const walkInTotal = useMemo(
    () =>
      Object.entries(walkInCart).reduce((total, [id, quantity]) => {
        const product = products.find((item) => item.id === id);
        return total + (product?.price ?? 0) * quantity;
      }, 0),
    [walkInCart, products],
  );
  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) ?? orders[0] ?? null;
  const completedOrders = orders.filter((order) => order.status === "Completed");
  const pendingOrders = orders.filter(
    (order) => order.status !== "Completed" && order.status !== "Cancelled",
  );
  const totalSales = transactions.reduce((total, transaction) => total + transaction.total, 0);
  const visibleProducts = products.filter(
    (product) => category === "All" || product.category === category,
  );

  function changeCart(
    cart: Record<string, number>,
    setCart: (value: Record<string, number>) => void,
    productId: string,
    delta: number,
  ) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const quantity = cart[productId] ?? 0;
    if (delta > 0 && quantity >= product.stock) {
      setNotice(`${product.name} is at the available demo stock limit.`);
      return;
    }
    const nextQuantity = quantity + delta;
    const next = { ...cart };
    if (nextQuantity <= 0) {
      delete next[productId];
    } else {
      next[productId] = nextQuantity;
    }
    setCart(next);
    setNotice("");
  }

  function placeOrder() {
    const lines = Object.entries(aosCart)
      .map(([id, quantity]) => {
        const product = products.find((item) => item.id === id);
        return product ? { product, quantity } : null;
      })
      .filter((entry): entry is { product: Product; quantity: number } => entry !== null);
    if (lines.length === 0) {
      setNotice("Add an item to the cart before placing a demo order.");
      return;
    }
    if (lines.some(({ product, quantity }) => quantity > product.stock)) {
      setNotice("A requested item is no longer available. Update the cart and try again.");
      return;
    }

    const orderNumber = nextOrderNumber;
    const id = `RW-DEMO-${String(orderNumber).padStart(3, "0")}`;
    const orderLines = lines.map(({ product, quantity }) => ({
      productId: product.id,
      name: product.name,
      quantity,
      unitPrice: product.price,
    }));
    const order: DemoOrder = {
      id,
      queue: 100 + orderNumber,
      customer: "Guest 01",
      lines: orderLines,
      total: orderLines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0),
      status: "Pending",
    };

    setProducts((current) =>
      current.map((product) => {
        const line = lines.find((item) => item.product.id === product.id);
        return line ? { ...product, stock: product.stock - line.quantity } : product;
      }),
    );
    setOrders((current) => [order, ...current]);
    setSelectedOrderId(id);
    setNextOrderNumber(orderNumber + 1);
    setAosCart({});
    setAosTab("Menu");
    setNotice(`${id} is now visible in the POS order queue.`);
  }

  function advanceOrder(order: DemoOrder) {
    const status = nextStatus(order.status);
    if (!status) return;
    setOrders((current) =>
      current.map((item) => (item.id === order.id ? { ...item, status } : item)),
    );
    if (status === "Completed") {
      setTransactions((current) =>
        current.some((transaction) => transaction.id === order.id)
          ? current
          : [
              {
                id: order.id,
                label: `${order.id} · Queue ${order.queue}`,
                kind: "AOS order",
                lines: order.lines,
                total: order.total,
              },
              ...current,
            ],
      );
    }
    setNotice(`${order.id} updated to ${status}; the AOS shares this status immediately.`);
  }

  function cancelOrder(order: DemoOrder) {
    if (order.status !== "Pending") return;
    setOrders((current) =>
      current.map((item) =>
        item.id === order.id ? { ...item, status: "Cancelled" } : item,
      ),
    );
    setProducts((current) =>
      current.map((product) => {
        const line = order.lines.find((item) => item.productId === product.id);
        return line ? { ...product, stock: product.stock + line.quantity } : product;
      }),
    );
    setNotice(`${order.id} cancelled. Reserved demo stock was returned.`);
  }

  function completeWalkInSale() {
    const lines = Object.entries(walkInCart)
      .map(([id, quantity]) => {
        const product = products.find((item) => item.id === id);
        return product ? { product, quantity } : null;
      })
      .filter((entry): entry is { product: Product; quantity: number } => entry !== null);
    if (!lines.length) {
      setNotice("Add an item to the walk-in cart before completing a demo sale.");
      return;
    }
    if (lines.some(({ product, quantity }) => quantity > product.stock)) {
      setNotice("A requested item is no longer available. Update the walk-in cart and try again.");
      return;
    }

    const saleNumber = nextSaleNumber;
    const sale: DemoTransaction = {
      id: `RW-DEMO-SALE-${String(saleNumber).padStart(3, "0")}`,
      label: `Walk-in receipt ${String(saleNumber).padStart(3, "0")}`,
      kind: "Walk-in sale",
      lines: lines.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        quantity,
        unitPrice: product.price,
      })),
      total: lines.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0),
    };
    setProducts((current) =>
      current.map((product) => {
        const line = lines.find((item) => item.product.id === product.id);
        return line ? { ...product, stock: product.stock - line.quantity } : product;
      }),
    );
    setTransactions((current) => [sale, ...current]);
    setWalkInCart({});
    setNextSaleNumber(saleNumber + 1);
    setReceipt(sale);
    setNotice(`${sale.label} completed with sample data. No payment was taken.`);
  }

  function resetDemo() {
    setProducts(initialProducts);
    setAosCart({});
    setWalkInCart({});
    setOrders([]);
    setTransactions([]);
    setSelectedOrderId(null);
    setNextOrderNumber(1);
    setNextSaleNumber(1);
    setAosTab("Menu");
    setPosTab("orders");
    setPhone("aos");
    setCategory("All");
    setReceipt(null);
    setNotice("Demo reset. Sample inventory and both phones are back to their starting state.");
    setConfirmReset(false);
  }

  function renderCart(
    cart: Record<string, number>,
    setCart: (value: Record<string, number>) => void,
    total: number,
    checkoutLabel: string,
    onCheckout: () => void,
  ) {
    const lines = Object.entries(cart).filter(([, quantity]) => quantity > 0);
    return (
      <div className="space-y-3">
        {lines.length ? (
          lines.map(([id, quantity]) => {
            const product = products.find((item) => item.id === id);
            if (!product) return null;
            return (
              <div key={id} className="rounded-xl border border-[#e8e2de] bg-white p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span aria-hidden="true" className="text-xl">{product.icon}</span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{product.name}</p>
                      <p className="text-[11px] text-[#625a58]">{formatPrice(product.price)} each</p>
                    </div>
                  </div>
                  <p className="shrink-0 text-xs font-bold">
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Decrease ${product.name} quantity`}
                      onClick={() => changeCart(cart, setCart, id, -1)}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[#ded7d3] bg-white text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9b2638]"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${product.name} quantity`}
                      disabled={quantity >= product.stock}
                      onClick={() => changeCart(cart, setCart, id, 1)}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[#ded7d3] bg-white text-lg enabled:hover:border-[#9b2638] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9b2638]"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = { ...cart };
                      delete next[id];
                      setCart(next);
                    }}
                    className="min-h-9 px-2 text-xs font-semibold text-[#9b2638] underline underline-offset-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="rounded-xl border border-dashed border-[#d7cfca] bg-white/70 p-5 text-center text-sm text-[#625a58]">
            Your demo cart is empty. Add an item from the menu.
          </p>
        )}
        <div className="flex items-center justify-between border-t border-[#e6e1de] pt-3">
          <span className="text-sm font-semibold">Total</span>
          <span className="font-display text-lg font-bold text-[#9b2638]">{formatPrice(total)}</span>
        </div>
        <button
          type="button"
          disabled={!lines.length}
          onClick={onCheckout}
          className="min-h-11 w-full rounded-xl bg-[#9b2638] px-4 py-2.5 text-sm font-bold text-white enabled:hover:bg-[#7d1d2c] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b2638]"
        >
          {checkoutLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed-light-surface min-w-0 rounded-3xl border border-[#9b2638]/20 bg-gradient-to-br from-[#faf8f6] via-white to-[#f4ecea] p-3 sm:p-5 lg:p-7">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9b2638]">
            Connected browser simulation
          </p>
          <h3 className="mt-1 font-display text-lg font-bold text-[#292526] sm:text-xl">
            Advanced Ordering · Point of Sale
          </h3>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[#625a58] sm:text-sm">
            AOS orders, POS status changes, and sample inventory share one in-memory demo state.
            No Android app, account, database, or payment service is connected.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setConfirmReset((value) => !value)}
          className="min-h-10 rounded-xl border border-[#9b2638]/35 bg-white px-3 py-2 text-xs font-semibold text-[#9b2638] hover:bg-[#fff7f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9b2638]"
        >
          Reset demo
        </button>
      </div>

      {confirmReset && (
        <div
          role="group"
          aria-label="Confirm reset demo"
          className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#9b2638]/25 bg-white p-3 text-sm text-[#292526]"
        >
          <span>Clear demo orders, sales, carts, and inventory changes?</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="min-h-10 rounded-lg border border-[#ded7d3] px-3 text-xs font-semibold"
            >
              Keep demo
            </button>
            <button
              type="button"
              onClick={resetDemo}
              className="min-h-10 rounded-lg bg-[#9b2638] px-3 text-xs font-semibold text-white"
            >
              Confirm reset
            </button>
          </div>
        </div>
      )}

      {notice && (
        <p aria-live="polite" className="mb-4 rounded-xl border border-[#9b2638]/15 bg-white px-3 py-2 text-xs text-[#625a58]">
          {notice}
        </p>
      )}

      <div className="mb-4 grid grid-cols-2 gap-2 lg:hidden">
        {(["aos", "pos"] as const).map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={phone === id}
            onClick={() => setPhone(id)}
            className={`min-h-12 rounded-xl border px-3 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9b2638] ${
              phone === id
                ? "border-[#9b2638] bg-[#9b2638] text-white"
                : "border-[#d7cfca] bg-white text-[#625a58]"
            }`}
          >
            {id === "aos" ? "Advanced Ordering" : "Point of Sale"}
          </button>
        ))}
      </div>

      <div className="grid min-w-0 items-start gap-5 lg:grid-cols-2 lg:gap-7">
        <div className={`min-w-0 ${phone === "aos" ? "block" : "hidden lg:block"}`}>
          <p className="mb-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9b2638]">
            Customer · AOS
          </p>
          <PhoneFrame app="AOS" title="Order from the canteen">
            <div className="mb-3 rounded-xl bg-[#9b2638] p-3 text-white">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white">
                Sample menu · Demo inventory
              </p>
              <p className="mt-1 text-sm font-bold">Good food, ready when you are.</p>
              <p className="mt-1 text-[10px] text-white">
                Items and prices below are illustrative portfolio data.
              </p>
            </div>
            <PhoneTabs
              items={["Menu", `Cart (${Object.values(aosCart).reduce((a, b) => a + b, 0)})`]}
              value={
                aosTab === "Cart"
                  ? `Cart (${Object.values(aosCart).reduce((a, b) => a + b, 0)})`
                  : "Menu"
              }
              onChange={(value) => setAosTab(value.startsWith("Cart") ? "Cart" : "Menu")}
              label="AOS screen"
            />
            {aosTab === "Menu" ? (
              <>
                <div className="my-3 flex gap-1 overflow-x-auto pb-1">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={category === item}
                      onClick={() => setCategory(item)}
                      className={`min-h-9 shrink-0 rounded-full px-3 text-[11px] font-semibold ${
                        category === item
                          ? "bg-[#292526] text-white"
                          : "border border-[#ded7d3] bg-white text-[#625a58]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <ul className="space-y-2">
                  {visibleProducts.map((product) => {
                    const quantity = aosCart[product.id] ?? 0;
                    const remaining = product.stock - quantity;
                    return (
                      <li key={product.id} className="flex items-center gap-3 rounded-xl border border-[#e8e2de] bg-white p-3">
                        <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f5eeeb] text-2xl">
                          {product.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold">{product.name}</p>
                          <p className="truncate text-[10px] text-[#625a58]">{product.description}</p>
                          <p className="mt-1 text-xs font-semibold text-[#9b2638]">{formatPrice(product.price)}</p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Add ${product.name} to AOS cart`}
                          disabled={remaining <= 0}
                          onClick={() => changeCart(aosCart, setAosCart, product.id, 1)}
                          className="min-h-10 min-w-10 rounded-lg bg-[#9b2638] px-2 text-sm font-bold text-white disabled:bg-[#d7cfca] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b2638]"
                        >
                          {remaining <= 0 ? "Out" : "+"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  onClick={() => setAosTab("Cart")}
                  className="mt-3 min-h-11 w-full rounded-xl bg-[#292526] px-4 py-2.5 text-xs font-semibold text-white"
                >
                  Review cart · {formatPrice(cartTotal)}
                </button>
              </>
            ) : (
              <div className="mt-3">
                {renderCart(aosCart, setAosCart, cartTotal, "Place demo order", placeOrder)}
              </div>
            )}
            {selectedOrder && (
              <div className="mt-4 rounded-xl border border-[#9b2638]/20 bg-white p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-[10px] font-bold text-[#9b2638]">
                    {selectedOrder.id} · Queue {selectedOrder.queue}
                  </p>
                  <StatusPill status={selectedOrder.status} />
                </div>
                <p className="mt-2 text-[10px] font-semibold text-[#625a58]">
                  Order tracking · updates from POS
                </p>
                <ol aria-label="Order progress" className="mt-3 grid grid-cols-4 gap-1">
                  {(["Pending", "Preparing", "Ready", "Completed"] as const).map((status) => {
                    const steps = ["Pending", "Preparing", "Ready", "Completed"];
                    const active = steps.indexOf(selectedOrder.status) >= steps.indexOf(status);
                    return (
                      <li
                        key={status}
                        className={`rounded-md px-1 py-1.5 text-center text-[8px] font-semibold ${
                          active ? "bg-[#9b2638] text-white" : "bg-[#eeeae7] text-[#625a58]"
                        }`}
                      >
                        {status}
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </PhoneFrame>
        </div>

        <div className={`min-w-0 ${phone === "pos" ? "block" : "hidden lg:block"}`}>
          <p className="mb-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9b2638]">
            Canteen operator · POS
          </p>
          <PhoneFrame app="POS" title="Canteen operations">
            <div className="mb-3 rounded-xl border border-[#e8e2de] bg-white p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#9b2638]">
                Shared demo state
              </p>
              <p className="mt-1 text-xs text-[#625a58]">
                {orders.length} orders · {pendingOrders.length} in progress · {formatPrice(totalSales)} demo sales
              </p>
            </div>
            <PhoneTabs
              items={["Orders", "Walk-in", "Summary"]}
              value={posTab === "orders" ? "Orders" : posTab === "walk-in" ? "Walk-in" : "Summary"}
              onChange={(value) =>
                setPosTab(value === "Walk-in" ? "walk-in" : value === "Summary" ? "summary" : "orders")
              }
              label="POS screen"
            />

            {posTab === "orders" && (
              <div className="mt-3 space-y-3">
                {orders.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-[#d7cfca] bg-white/70 p-5 text-center text-sm text-[#625a58]">
                    New AOS orders will appear here immediately.
                  </p>
                ) : (
                  <>
                    <ul className="space-y-2">
                      {orders.map((order) => (
                        <li key={order.id}>
                          <button
                            type="button"
                            aria-pressed={selectedOrder?.id === order.id}
                            onClick={() => setSelectedOrderId(order.id)}
                            className={`min-h-14 w-full rounded-xl border p-3 text-left ${
                              selectedOrder?.id === order.id
                                ? "border-[#9b2638]/60 bg-[#fff7f6]"
                                : "border-[#e8e2de] bg-white"
                            }`}
                          >
                            <span className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[10px] font-bold">{order.id}</span>
                              <StatusPill status={order.status} />
                            </span>
                            <span className="mt-1 flex justify-between text-[10px] text-[#625a58]">
                              <span>Queue {order.queue} · {order.customer}</span>
                              <span className="font-semibold">{formatPrice(order.total)}</span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    {selectedOrder && (
                      <div className="rounded-xl border border-[#e8e2de] bg-white p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-mono text-[10px] font-bold">{selectedOrder.id}</p>
                          <StatusPill status={selectedOrder.status} />
                        </div>
                        <ul className="mt-3 space-y-1.5">
                          {selectedOrder.lines.map((line) => (
                            <li key={line.productId} className="flex justify-between gap-2 text-[11px]">
                              <span>{line.quantity} × {line.name}</span>
                              <span className="font-semibold">{formatPrice(line.quantity * line.unitPrice)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex justify-between border-t border-[#eeeae7] pt-2 text-xs font-bold">
                          <span>Total</span><span>{formatPrice(selectedOrder.total)}</span>
                        </div>
                        {nextStatus(selectedOrder.status) ? (
                          <button
                            type="button"
                            onClick={() => advanceOrder(selectedOrder)}
                            className="mt-3 min-h-10 w-full rounded-lg bg-[#9b2638] px-3 text-xs font-bold text-white"
                          >
                            Mark {nextStatus(selectedOrder.status)}
                          </button>
                        ) : (
                          <p className="mt-3 text-center text-[10px] font-semibold text-[#625a58]">
                            {selectedOrder.status === "Completed"
                              ? "Order complete · included in demo sales"
                              : `Order ${selectedOrder.status.toLowerCase()}`}
                          </p>
                        )}
                        {selectedOrder.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => cancelOrder(selectedOrder)}
                            className="mt-2 min-h-9 w-full rounded-lg border border-[#ded7d3] px-3 text-[11px] font-semibold text-[#625a58]"
                          >
                            Cancel order and restore stock
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {posTab === "walk-in" && (
              <div className="mt-3 space-y-3">
                <p className="rounded-xl bg-[#fff7f6] p-3 text-[10px] leading-relaxed text-[#625a58]">
                  Optional portfolio simulation only. Completing this sale changes sample stock and the demo sales summary; it does not take payment.
                </p>
                {renderCart(
                  walkInCart,
                  setWalkInCart,
                  walkInTotal,
                  "Complete demo sale",
                  completeWalkInSale,
                )}
                <div className="space-y-2">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between gap-2 rounded-lg border border-[#e8e2de] bg-white px-3 py-2">
                      <span className="min-w-0 truncate text-[11px] font-semibold">
                        {product.icon} {product.name} · {product.stock} left
                      </span>
                      <button
                        type="button"
                        aria-label={`Add ${product.name} to POS walk-in cart`}
                        disabled={product.stock <= (walkInCart[product.id] ?? 0)}
                        onClick={() => changeCart(walkInCart, setWalkInCart, product.id, 1)}
                        className="min-h-9 min-w-9 rounded-lg bg-[#292526] text-sm font-bold text-white disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
                {receipt && (
                  <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
                    <p className="font-mono font-bold">{receipt.label}</p>
                    <ul className="mt-2 space-y-1">
                      {receipt.lines.map((line) => (
                        <li key={line.productId} className="flex justify-between gap-2">
                          <span>{line.quantity} × {line.name}</span>
                          <span>{formatPrice(line.quantity * line.unitPrice)}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 border-t border-emerald-200 pt-2 font-bold">
                      Sample receipt total: {formatPrice(receipt.total)}
                    </p>
                    <p className="mt-1 text-[10px]">No payment was processed.</p>
                  </div>
                )}
              </div>
            )}

            {posTab === "summary" && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["Demo orders", orders.length],
                    ["Completed", completedOrders.length],
                    ["In progress", pendingOrders.length],
                    ["Sales", formatPrice(totalSales)],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-[#e8e2de] bg-white p-3">
                      <p className="text-[10px] text-[#625a58]">{label}</p>
                      <p className="mt-1 font-display text-sm font-bold text-[#9b2638]">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-[#e8e2de] bg-white p-3">
                  <h4 className="text-xs font-bold">Recent completed transactions</h4>
                  {transactions.length ? (
                    <ul className="mt-3 space-y-2">
                      {transactions.map((transaction) => (
                        <li key={transaction.id} className="flex items-start justify-between gap-2 border-t border-[#eeeae7] pt-2 text-[10px]">
                          <span className="min-w-0">
                            <span className="block font-semibold">{transaction.label}</span>
                            <span className="text-[#625a58]">{transaction.kind}</span>
                          </span>
                          <span className="shrink-0 font-bold">{formatPrice(transaction.total)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-[10px] text-[#625a58]">
                      Complete an order or sample walk-in sale to add a transaction.
                    </p>
                  )}
                </div>
                <div className="rounded-xl border border-[#e8e2de] bg-white p-3">
                  <h4 className="text-xs font-bold">Sample inventory</h4>
                  <ul className="mt-2 space-y-1">
                    {products.map((product) => (
                      <li key={product.id} className="flex justify-between text-[10px]">
                        <span>{product.name}</span><span className={product.stock === 0 ? "font-bold text-[#9b2638]" : ""}>{product.stock} available</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
