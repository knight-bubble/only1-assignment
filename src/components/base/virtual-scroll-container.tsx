import { useVirtualizer } from "@tanstack/react-virtual";
import { ReactNode, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type VirtualScrollContainerProps = {
  children: (index: number) => ReactNode;
  count: number;
  loadMore: () => void;
};

export default function VirtualScrollContainer({ children, count, loadMore }: VirtualScrollContainerProps) {
  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 384,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = virtualItems.slice(-1);

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= count - 1) {
      loadMore();
    }
  }, [count, virtualItems, loadMore]);

  return (
    <div
      ref={parentRef}
      className='w-full h-full scrollbar scrollbar-w-2 scrollbar-thumb-rounded-lg scrollbar-thumb-base-300 scrollbar-track-base-400 overflow-y-scroll'
    >
      <div className={twMerge("w-96 mx-auto relative", `h-[${rowVirtualizer.getTotalSize()}px]`)}>
        <div
          className={twMerge("absolute top-0 left-0 w-full")}
          style={{
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
          }}
        >
          {virtualItems.map((virtualRow) => children(virtualRow.index))}
        </div>
      </div>
    </div>
  );
}
