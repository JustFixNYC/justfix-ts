import React from "react";

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
      inquilinos, los inquilinos no pueden ser desalojados por ninguna razón.
      Visita las{" "}
      <a
        href="https://www.righttocounselnyc.org/ny_eviction_moratorium_faq"
        target="_blank"
        rel="noopener noreferrer"
      >
        <b>
          Preguntas Más Frecuentes sobre la Moratoria de Desalojo del Right to
          Council
        </b>
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
      for any reason. Visit{" "}
      <a
        href="https://www.righttocounselnyc.org/ny_eviction_moratorium_faq"
        target="_blank"
        rel="noopener noreferrer"
      >
        <b>Right to Council’s Eviction Moratorium FAQs</b>
      </a>{" "}
      to learn more.
    </>
  );
};
