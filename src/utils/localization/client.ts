'use client';

import { useEffect } from 'react';
import { initReactI18next, useTranslation as useTransAlias } from 'react-i18next';
import i18next, { type i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useParams } from 'next/navigation';

import { type LocaleTypes, getOptions, locales } from './settings';

const runsOnServerSide = typeof window === 'undefined';

// Initialize i18next for the client side
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: LocaleTypes, namespace: string) => {
      return import(`./locales/${language}/${namespace}.json`);
    }),
  )
  .init({
    ...getOptions(),
    lng: undefined, // detect the language on the client
    detection: {
      order: ['path'],
    },
    preload: runsOnServerSide ? locales : [],
  });

export function useTranslationByLng(lng: LocaleTypes, ns: string | string[]) {
  const translator = useTransAlias(ns);
  const { i18n } = translator;

  // Run content is being rendered on server side
  if (runsOnServerSide && lng) {
    // && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    // Use our custom implementation when running on client side
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomTranslationImplementation(i18n, lng);
  }
  return translator;
}

function useCustomTranslationImplementation(i18n: i18n, lng: LocaleTypes) {
  // This effect changes the language of the application when the lng prop changes.
  useEffect(() => {
    if (!lng) return; // || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);
}

export function useTranslation(ns: string | string[]) {
  const { locale } = useParams();
  return useTranslationByLng(locale as LocaleTypes, ns);
}
