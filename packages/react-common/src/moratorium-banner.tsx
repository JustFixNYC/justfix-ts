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
      JustFix.nyc está operativo, y hemos adaptado nuestros productos a las
      normas establecidas durante la crisis de COVID-19. Todavía recomendamos
      que se tomen todas las precauciones posibles para mantenerse sanos durante
      esta crisis de salud pública. Los organizadores de inquilinos de la ciudad
      luchan por mantener la gente en sus casas. Visita{" "}
      <a
        href="https://www.righttocounselnyc.org/organizing_covid19"
        target="_blank"
        rel="noopener noreferrer"
      >
        Coalición del Derecho a Representación Legal (en inglés)
      </a>{" "}
      para obtener más información.
    </>
  ) : (
    <>
      <b>COVID-19 Update: </b>
      JustFix.nyc is operating, and has adapted our products to match rules put
      in place during the COVID-19 crisis. We recommend you take full
      precautions to stay safe during this public health crisis. Tenant leaders
      and organizers around the city are fighting to keep people in their homes.
      Visit{" "}
      <a
        href="https://www.righttocounselnyc.org/organizing_covid19"
        target="_blank"
        rel="noopener noreferrer"
      >
        Right to Counsel Coalition
      </a>{" "}
      to learn more.
    </>
  );
};
