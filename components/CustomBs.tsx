import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, ReactNode, Ref } from "react";

interface CustomBsProps {
  modalContent: ReactNode;
  snapPoints: BottomSheetProps["snapPoints"];
  onClose: () => void;
}

const CustomBs = forwardRef<BottomSheetProps, CustomBsProps>(
  ({ modalContent, snapPoints, onClose }, ref: any) => {
    const sps = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );

    return (
      <BottomSheet
        index={-1}
        ref={ref}
        snapPoints={sps}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        onClose={onClose}
        containerStyle={{ paddingBottom: 650 }}
      >
        {modalContent}
      </BottomSheet>
    );
  }
);

export default CustomBs;
