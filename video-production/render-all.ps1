$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $MyInvocation.MyCommand.Path
$portfolioPublic = Join-Path $workspace "..\portfolio\public"
$outputDirectory = Join-Path $portfolioPublic "videos"
$remotion = Join-Path $workspace "node_modules\.bin\remotion.cmd"

if (-not (Test-Path -LiteralPath $remotion)) {
  throw "Remotion is not installed. Run npm install in the video-production folder."
}

if (-not (Test-Path -LiteralPath $portfolioPublic)) {
  throw "The portfolio public directory was not found: $portfolioPublic"
}

New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 0)
$listener.Start()
$port = $listener.LocalEndpoint.Port
$listener.Stop()

$renders = @(
  @{ Id = "docugraph"; File = "docugraph-loop.mp4" },
  @{ Id = "mayari"; File = "mayari-loop.mp4" },
  @{ Id = "red-warriors"; File = "red-warriors-loop.mp4" },
  @{ Id = "cs-expo"; File = "cs-expo-loop.mp4" },
  @{ Id = "wedding"; File = "wedding-loop.mp4" }
)

foreach ($render in $renders) {
  $output = Join-Path $outputDirectory $render.File
  Write-Host "`nRendering $($render.Id) -> $output"

  $arguments = @(
    "render",
    "src/index.tsx",
    $render.Id,
    $output,
    "--public-dir",
    $portfolioPublic,
    "--port",
    "$port",
    "--codec",
    "h264",
    "--crf",
    "19",
    "--pixel-format",
    "yuv420p",
    "--muted",
    "--concurrency",
    "2"
  )

  & $remotion @arguments
  if ($LASTEXITCODE -ne 0) {
    throw "Remotion failed while rendering $($render.Id) (exit $LASTEXITCODE)."
  }

  $file = Get-Item -LiteralPath $output
  if ($file.Length -lt 100000) {
    throw "Rendered output is unexpectedly small: $output ($($file.Length) bytes)"
  }

  Write-Host ("Rendered {0:N1} MB" -f ($file.Length / 1MB))
}

Write-Host "`nAll five local renders completed."
