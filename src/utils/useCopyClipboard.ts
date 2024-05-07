import { useCallback, useState } from 'react';
import copy from 'copy-to-clipboard';

export type CopyToClipboardState = {
  value?: string;
  noUserInteraction: boolean;
  error?: Error;
};

export type CopyToClipboardHook = () => [CopyToClipboardState, (value: string) => void];

const useCopyToClipboard: CopyToClipboardHook = () => {
  const [state, setState] = useState<CopyToClipboardState>({
    value: undefined,
    error: undefined,
    noUserInteraction: true,
  });

  const copyToClipboard = useCallback((value: string | number) => {
    let noUserInteraction = false;
    let normalizedValue = '';

    try {
      if (typeof value !== 'string' && typeof value !== 'number') {
        const error = new Error(
          `Cannot copy typeof ${typeof value} to clipboard, must be a string`,
        );
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
        setState({
          value,
          error,
          noUserInteraction: true,
        });

        return;
      } else if (value === '') {
        const error = new Error(`Cannot copy empty string to clipboard.`);
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
        setState({
          value,
          error,
          noUserInteraction: true,
        });
        return;
      }
      normalizedValue = value.toString();
      noUserInteraction = copy(normalizedValue);
      setState({
        value: normalizedValue,
        error: undefined,
        noUserInteraction,
      });
    } catch (error) {
      if (error instanceof Error) {
        setState({
          value: normalizedValue,
          error,
          noUserInteraction,
        });
      }
    }
  }, []);

  return [state, copyToClipboard];
};

export default useCopyToClipboard;
