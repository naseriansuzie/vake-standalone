'use client';

import { type ComponentProps, type PropsWithChildren, forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

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

    const contentClassName = fullDialog
      ? `fixed top-0 right-0 bottom-0 left-0 w-full animate-fullContentShow overflow-y-auto place-items-center transform-none bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none ${className}`
      : `fixed top-1/2 left-1/2 w-[calc(100%-70px)] animate-contentShow bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] -translate-x-1/2 -translate-y-1/2 focus:outline-none ${className}`;

    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed grid animate-overlayShow bg-[rgba(0,0,0,0.4)] inset-0" />
        <DialogPrimitive.Content
          {...props}
          className={contentClassName}
          asChild={asChild}
          onEscapeKeyDown={handleEscapeKeyDown}
          onInteractOutside={(e) => handleInteractOutside(e.detail.originalEvent)}
          ref={ref}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);
DialogContainer.displayName = 'DialogContainer';

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
