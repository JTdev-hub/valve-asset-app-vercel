import { Skeleton, SkeletonText } from "@chakra-ui/react";

interface Props {
  loadingType: "table" | "details";
}

const SkeletonLoading = ({ loadingType }: Props) => {
  const skeletonRenderMap: Record<Props["loadingType"], JSX.Element> = {
    table: (
      <>
        <SkeletonText noOfLines={1} padding={3} />
        <SkeletonText noOfLines={10} padding={3} />
      </>
    ),
    details: (
      <>
        <SkeletonText padding={10} />
        <Skeleton height="500px" />
      </>
    ),
  };

  return skeletonRenderMap[loadingType] || null;
};

export default SkeletonLoading;
