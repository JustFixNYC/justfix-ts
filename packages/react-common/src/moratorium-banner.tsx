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
      <b>Actualización COVID-19: </b>
      Recomendamos que se tomen todas las precauciones posibles para mantenerse
      sanos durante esta crisis de salud pública. Los organizadores de
      inquilinos de la ciudad luchan por mantener la gente en sus casas. Visita{" "}
      <a
        href="https://d3n8a8pro7vhmx.cloudfront.net/righttocounselnyc/pages/191/attachments/original/1603843954/ESP_-_Eviction_Moratorium_FAQ_10.2020_.pdf?1603843954"
        target="_blank"
        rel="noopener noreferrer"
      >
        Coalición del Derecho a Representación Legal
      </a>{" "}
      para obtener más información.
    </>
  ) : (
    <>
      <b>COVID-19 Update: </b>
      We recommend you take full precautions to stay safe during this public
      health crisis. Tenant leaders and organizers around the city are fighting
      to keep people in their homes. Visit{" "}
      <a
        href="https://www.righttocounselnyc.org/ny_eviction_moratorium_faq"
        target="_blank"
        rel="noopener noreferrer"
      >
        Right to Counsel Coalition
      </a>{" "}
      to learn more.
    </>
  );
};
