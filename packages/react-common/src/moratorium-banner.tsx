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
      esta crisis de salud pública. Gracias al poder de la organización de
      inquilinos, los inquilinos no pueden ser desalojados por ninguna razón
      hasta el 1 de octubre. Visita las{" "}
      <a
        href="https://www.righttocounselnyc.org/moratoria_de_desalojo"
        target="_blank"
        rel="noopener noreferrer"
      >
        Preguntas Más Frecuentes sobre la Moratoria de Desalojo del Right to
        Council
      </a>{" "}
      para obtener más información.
    </>
  ) : (
    <>
      <b>COVID-19 Update: </b>
      JustFix.nyc is operating, and has adapted our products to match
      preliminary rules put in place during the COVID-19 crisis. We recommend
      you take full precautions to stay safe during this public health crisis.
      Thanks to tenant organizing during this time, renters cannot be evicted
      for any reason until October 1st. Visit{" "}
      <a
        href="https://www.righttocounselnyc.org/ny_eviction_moratorium_faq"
        target="_blank"
        rel="noopener noreferrer"
      >
        Right to Council’s Eviction Moratorium FAQs
      </a>{" "}
      to learn more.
    </>
  );
};
