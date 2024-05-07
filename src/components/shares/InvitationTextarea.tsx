'use client';

import type { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

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
    <StyledTextareaContainer>
      <StyledTextarea
        placeholder={t('share_message_placeholder')}
        value={message}
        onChange={handleChange}
      />
      <StyledCounter>
        <span>
          {message.length}
          {t('word_count')}
        </span>
        /{MAX_MESSAGE_LENGTH}
        {t('word_count')}
      </StyledCounter>
    </StyledTextareaContainer>
  );
};

const StyledTextareaContainer = styled.div`
  max-width: 500px;
  margin: 0 auto 80px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 110px;
  box-sizing: border-box;
  padding: 16px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  margin: 0 auto 6px;
  background: #fafafa;
  color: rgba(0, 0, 0, 0.9);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.75px;
  line-height: 22px;

  &:focus,
  &:focus-visible,
  &:focus-within,
  &:active {
    border: 1px solid #4a64ff;
    outline: none;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.75px;
    line-height: 22px;
  }
`;

const StyledCounter = styled.div`
  color: #2b2b2b;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  text-align: right;

  > span {
    color: #4a64ff;
  }
`;

export default InvitationTextarea;
