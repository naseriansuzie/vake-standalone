'use client';

import Image from 'next/image';
import styled from 'styled-components';

import { useTranslation } from '@/utils/localization/client';

import Close from '@/assets/close.png';
import PrimaryCheckIcon from '@/assets/primary_check.png';

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
      <StyledDialogContent onClickOutSide={onClose}>
        <StyledDialogClose asChild onClick={onClose}>
          <Image src={Close.src} alt={t('close', { ns: 'common' })} width={13} height={13} />
        </StyledDialogClose>
        <DialogTitle asChild>
          <StyledTitleWrapper>
            <div>
              <Image src={PrimaryCheckIcon.src} alt="check_icon" width={28} height={28} />
            </div>
            <StyledMessage>{t('link_copy_success')}</StyledMessage>
          </StyledTitleWrapper>
        </DialogTitle>
        <StyledDialogDescription>{t('link_copy_success_description')}</StyledDialogDescription>
      </StyledDialogContent>
    </Dialog>
  );
};

export default ShareCompletedDialog;

const StyledDialogContent = styled(DialogContainer)`
  max-width: 500px;
  padding: 18px;
`;

const StyledDialogClose = styled(DialogClose)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
`;

const StyledMessage = styled.p`
  color: #4a64ff;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.9px;
`;

const StyledDialogDescription = styled(DialogDescription)`
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.8px;
  margin-bottom: 6px;
`;
