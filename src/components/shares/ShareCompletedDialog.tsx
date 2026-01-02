'use client';

import Image from 'next/image';

import { useTranslation } from '@/utils/localization/client';

import Close from '@/assets/icons/close.png';
import PrimaryCheckIcon from '@/assets/icons/primary_check.png';

import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogDescription,
  DialogTitle,
} from '@/components/common/Dialog';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ShareCompletedDialog = ({ open, onClose }: Props) => {
  const { t } = useTranslation(['shares', 'common']);

  return (
    <Dialog defaultOpen={open}>
      <DialogContainer className="max-w-[500px] p-[18px]" onClickOutSide={onClose}>
        <DialogClose className="absolute top-4 right-4" asChild onClick={onClose}>
          <Image src={Close.src} alt={t('close', { ns: 'common' })} width={13} height={13} />
        </DialogClose>
        <DialogTitle asChild>
          <div className="flex flex-col items-center justify-center mb-2 gap-[5px]">
            <div>
              <Image src={PrimaryCheckIcon.src} alt="check_icon" width={28} height={28} />
            </div>
            <p className="text-[#4a64ff] font-bold text-lg leading-normal text-center tracking-[-0.9px]">
              {t('link_copy_success')}
            </p>
          </div>
        </DialogTitle>
        <DialogDescription className="mb-[6px] text-[rgba(0,0,0,0.8)] text-base font-medium leading-normal text-center tracking-[-0.8px]">
          {t('link_copy_success_description')}
        </DialogDescription>
      </DialogContainer>
    </Dialog>
  );
};

export default ShareCompletedDialog;
