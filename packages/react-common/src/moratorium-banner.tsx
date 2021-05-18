import React from "react";

/**
 * Renders a banner of text announcing JustFix's status during COVID-19 and details of the NYC Eviction Moratorium.
 * The optional "locale" property is used for localization. If the property is set to an accepted locale (like "es"),
 * the resulting blurb of text will be rendered in that given language. If the property is undefined or not an accepted
 * locale, the English version of the blurb is returned.
 *
 * Note: the component is completely unstyled, i.e. styling it is the responsibility of the caller.
 */
export const CovidMoratoriumBanner: React.FC<{ locale?: string }> = ({
  locale,
}) => {
  return locale === "es" ? (
    <>
      ¡Protecciones de desalojo extendidas hasta el 31 de agosto!{" "}
      <a
        href="https://www.evictionfreeny.org/es"
        target="_blank"
        rel="noopener noreferrer"
      >
        Protéjete aquí
      </a>
    </>
  ) : (
    <>
      Eviction protections extended until August 31!{" "}
      <a
        href="https://www.evictionfreeny.org/en"
        target="_blank"
        rel="noopener noreferrer"
      >
        Protect yourself here
      </a>
    </>
  );
};
