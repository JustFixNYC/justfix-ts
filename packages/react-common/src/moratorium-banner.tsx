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
      DESARROLLANDO: La Corte de Viviendas está impidiendo que los inquilinos
      demanden a sus dueños a través de JustFix.{" "}
      <a
        href="https://justfixnyc.medium.com/housing-court-blocks-tenants-from-suing-their-landlords-d7b9e3629a32"
        target="_blank"
        rel="noopener noreferrer"
      >
        Más información aquí
      </a>
    </>
  ) : (
    <>
      DEVELOPING: Housing Court is blocking tenants from suing their landlords
      through JustFix.{" "}
      <a
        href="https://justfixnyc.medium.com/housing-court-blocks-tenants-from-suing-their-landlords-d7b9e3629a32"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more here 
      </a>
    </>
  );
};
