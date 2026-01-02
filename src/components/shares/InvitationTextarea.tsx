'use client';

import type { Dispatch, SetStateAction } from 'react';

import { useTranslation } from '@/utils/localization/client';

type Props = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setIsMessageValid: Dispatch<SetStateAction<boolean>>;
};

const MAX_MESSAGE_LENGTH = 100 as const;

const InvitationTextarea = ({ message, setMessage, setIsMessageValid }: Props) => {
  const { t } = useTranslation('shares');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_MESSAGE_LENGTH) {
      setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH));
      setIsMessageValid(true);
      return;
    }

    if (e.target.value.length === 0) {
      setIsMessageValid(false);
      setMessage(e.target.value);
      return;
    }

    setMessage(e.target.value);
    setIsMessageValid(true);
  };

  return (
    <div className="mx-auto mb-20 max-w-[500px]">
      <textarea
        id="invitation-message"
        className="mx-auto mb-[6px] box-border h-[110px] w-full min-w-[calc(100vw-60px)] rounded-[15px] border border-[#d9d9d9] bg-[#fafafa] px-5 py-4 text-base leading-[22px] font-normal tracking-[-0.75px] text-[rgba(0,0,0,0.9)] placeholder:text-base placeholder:leading-[22px] placeholder:font-normal placeholder:tracking-[-0.75px] placeholder:text-[rgba(0,0,0,0.3)] focus-within:border-[#4a64ff] focus:border-[#4a64ff] focus:outline-none focus-visible:border-[#4a64ff] active:border-[#4a64ff]"
        placeholder={t('share_message_placeholder')}
        value={message}
        onChange={handleChange}
      />
      <div className="text-right text-xs leading-normal font-normal text-[#2b2b2b]">
        <span className="text-[#4a64ff]">
          {message.length}
          {t('word_count')}
        </span>
        /{MAX_MESSAGE_LENGTH}
        {t('word_count')}
      </div>
    </div>
  );
};

export default InvitationTextarea;
