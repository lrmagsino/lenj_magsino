import { Composition, registerRoot } from "remotion";
import VideoProject, { type VideoProjectId } from "./VideoProject";

const projects: VideoProjectId[] = [
  "docugraph",
  "mayari",
  "red-warriors",
  "cs-expo",
  "wedding",
];

function RemotionRoot() {
  return (
    <>
      {projects.map((id) => (
        <Composition
          key={id}
          id={id}
          component={VideoProject}
          durationInFrames={360}
          fps={30}
          width={1280}
          height={720}
          defaultProps={{ projectId: id }}
        />
      ))}
    </>
  );
}

registerRoot(RemotionRoot);
