'use client';

import { type ComponentProps, type PropsWithChildren, forwardRef, type ForwardedRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import styled, { css, keyframes } from 'styled-components';

type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root>;

const Dialog = ({ children, ...props }: PropsWithChildren<DialogRootProps>) => {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
};
Dialog.displayName = 'Dialog';

const DialogTrigger = DialogPrimitive.Trigger;
DialogTrigger.displayName = 'DialogTrigger';

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  className?: string;
  fullDialog?: boolean;
  disableClickOutside?: boolean;
  disableEscapeKeyDown?: boolean;
  onClickOutSide?: (event: FocusEvent) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
};

const DialogContainer = forwardRef<HTMLDivElement, PropsWithChildren<DialogContentProps>>(
  (
    {
      children,
      className = '',
      fullDialog = false,
      disableClickOutside = false,
      disableEscapeKeyDown = false,
      onClickOutSide,
      onEscapeKeyDown,
      asChild,
      ...props
    },
    ref,
  ) => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (disableEscapeKeyDown) {
        event.preventDefault();
        return;
      }

      if (typeof onEscapeKeyDown === 'function') {
        onEscapeKeyDown(event);
      }
    };

    const handleInteractOutside = (event: FocusEvent) => {
      if (disableClickOutside) {
        event.preventDefault();
        return;
      }

      if (typeof onClickOutSide === 'function') {
        onClickOutSide(event);
      }
    };

    return (
      <DialogPrimitive.Portal>
        <StyledDialogOverlay />
        <StyledDialogContent
          {...props}
          className={className}
          asChild={asChild}
          onEscapeKeyDown={handleEscapeKeyDown}
          onInteractOutside={(e) => handleInteractOutside(e.detail.originalEvent)}
          $fullDialog={fullDialog}
          ref={ref}
        >
          {children}
        </StyledDialogContent>
      </DialogPrimitive.Portal>
    );
  },
);
DialogContainer.displayName = 'DialogContainer';

const overlayShow = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
   from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const StyledDialogOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  display: grid;
  background: rgba(0, 0, 0, 0.4);
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const fullDialogStyle = css`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: none;
  width: 100%;
  place-items: center;
  overflow-y: auto;
`;

const StyledDialogContent = styled(DialogPrimitive.Content)<{
  ref: ForwardedRef<HTMLDivElement>;
  $fullDialog?: boolean;
}>`
  background: #fff;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: calc(100% - 35px - 35px);
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  ${(props) => props.$fullDialog && fullDialogStyle};

  &:focus {
    outline: none;
  }
`;

type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close> & {
  className?: string;
};

const DialogClose = ({ children, className, ...props }: PropsWithChildren<DialogCloseProps>) => {
  return (
    <DialogPrimitive.Close {...props} className={className}>
      {children}
    </DialogPrimitive.Close>
  );
};
DialogClose.displayName = 'DialogClose';

type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title> & {
  className?: string;
};

const DialogTitle = ({ children, className, ...props }: PropsWithChildren<DialogTitleProps>) => {
  return (
    <DialogPrimitive.Title className={className} {...props}>
      {children}
    </DialogPrimitive.Title>
  );
};
DialogTitle.displayName = 'DialogTitle';

type DialogDescription = ComponentProps<typeof DialogPrimitive.Description> & {
  className?: string;
};

const DialogDescription = ({
  className,
  children,
  ...props
}: PropsWithChildren<DialogDescription>) => {
  return (
    <DialogPrimitive.Description className={className} {...props}>
      {children}
    </DialogPrimitive.Description>
  );
};
DialogDescription.displayName = 'DialogDescription';

export { Dialog, DialogTrigger, DialogContainer, DialogClose, DialogTitle, DialogDescription };
