const getAlignmentFromShort = alignment => {
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

const getAlignmentFromLong = alignment => {
  switch (alignment.toLowerCase()) {
    case "neutral":
      return "NTRL";

    case "conservative":
      return "CONS";

    case "socialist":
      return "SOCL";

    case "nationalist":
      return "NATL";

    case "individualist":
      return "INDV";

    case "anarcho-capitalist":
      return "ANCA";

    case "sjw":
      return "SJW";

    case "representative liberal":
      return "RPLB";

    default:
      return "NTRL";
  }
};

const shuffle = array => {
  var currentIndex = array.length,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

module.exports = { shuffle, getAlignmentFromLong, getAlignmentFromShort };
