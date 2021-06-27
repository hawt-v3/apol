export const getAlignmentFromShort = alignment => {
  switch (alignment) {
    case "NTRL":
      return "Neutral";

    case "CONS":
      return "Conservative";

    case "SOCL":
      return "Socialist";

    case "NATL":
      return "Nationalist";

    case "INDV":
      return "Individualist";

    case "ANCA":
      return "Anarcho-Capitalist";

    case "SJW":
      return "SJW";

    case "RPLB":
      return "Representative Liberal";

    default:
      return "Neutral";
  }
};

export const getAlignmentFromLong = alignment => {
  switch (alignment) {
    case "Neutral":
      return "NTRL";

    case "Conservative":
      return "CONS";

    case "Socialist":
      return "SOCL";

    case "Nationalist":
      return "NATL";

    case "Individualist":
      return "INDV";

    case "Anarcho-Capitalist":
      return "ANCA";

    case "SJW":
      return "SJW";

    case "Representative Liberal":
      return "RPLB";

    default:
      return "Neutral";
  }
};
