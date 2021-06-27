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
