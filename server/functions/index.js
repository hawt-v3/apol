const cors = require("cors")({ origin: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("bcdc962160354c3eae2530a1f380e8dd");
const axios = require("axios").default;

const serviceAccount = require("./key.json");
const { shuffle, getAlignmentFromLong } = require("./helpers");
const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: "AIzaSyBzZDHN4L_5zzGhsjxxjhKep39YVvRv1i0",
  formatter: "json",
};

const geocoder = NodeGeocoder(options);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const getCity = async (lat, lon) => {
  const res = await geocoder.reverse({ lat: 45.767, lon: 4.833 });

  if (!res) return null;

  return {
    city: res[0].city,
    country: res[0].country,
    countryCode: res[0].countryCode,
  };
};

exports.getLocalNews = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const { coordinates, otherSide } = request.body;

    if (!coordinates || !coordinates[0] || !coordinates[1]) {
      response.status(400);
      return response.json({ message: "Please provide coordinates" });
    }

    const { city, country, countryCode } = await getCity(
      coordinates[0],
      coordinates[1]
    );

    const news = await newsapi.v2.everything({
      q: `${city} ${country}`,
      // country: countryCode.toLowerCase(),
      langauge: "en",
      lang: countryCode.toLowerCase(),
    });

    let articles = news.articles.map(article => {
      article.publishedAt = new Date(article.publishedAt);
      return article;
    });

    if (otherSide) {
      articles = shuffle(articles);
    }

    articles.sort((a, b) => a.publishedAt.getTime() > b.publishedAt.getTime());

    return response.json(articles);
  });
  return;
});

exports.getArticles = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const { userId } = request.body;
    const { otherSide } = request.body;

    if (!userId) {
      response.status(401);
      return response.json({ message: "Please provide an id" });
    }

    // fetch the user's alignemnt

    const user = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then(user => user.data());

    // fetch teh sutff from my firestore

    const allArticles = await admin
      .firestore()
      .collection("articles")
      .orderBy("publishedAt", "desc")
      .limit(30)
      .get()
      .then(data => data.docs.map(doc => doc.data()));

    if (!user) {
      response.status(401);
      return response.json({ message: "User not found" });
    }

    const { alignment } = user;
    const { neutral } = user;

    // now run the algorithm

    const categories = {
      neutral: [],
      conservative: [],
      socialist: [],
      nationalist: [],
      individualist: [],
      anarchoCapitalist: [],
      sjw: [],
      representativeLiberal: [],
    };

    allArticles.forEach(article => {
      switch (article.alignment) {
        case "NTRL":
          categories.neutral.push(article);
          break;

        case "CONS":
          categories.conservative.push(article);
          break;

        case "SOCL":
          categories.socialist.push(article);
          break;

        case "NATL":
          categories.nationalist.push(article);
          break;

        case "INDV":
          categories.individualist.push(article);
          break;

        case "ANCA":
          categories.anarchoCapitalist.push(article);
          break;

        case "SJW":
          categories.sjw.push(article);
          break;

        case "RPLB":
          categories.representativeLiberal.push(article);
          break;

        default:
          categories.neutral.push(article);
          break;
      }
    });

    let articles = [];

    //   figure out the articles
    if (neutral) {
      const neutralArticles = shuffle(categories.neutral);

      for (let i = 0; i < 10; i++) {
        articles.push(neutralArticles[i]);
      }
      response.json(articles);
      return;
    }

    if (!otherSide) {
      switch (alignment) {
        case "NTRL":
          articles.push(
            categories.neutral[
              Math.floor(Math.random() * categories.neutral.length)
            ]
          );
          break;

        case "CONS":
          articles.push(
            categories.conservative[
              Math.floor(Math.random() * categories.conservative.length)
            ]
          );
          break;

        case "SOCL":
          articles.push(
            categories.socialist[
              Math.floor(Math.random() * categories.socialist.length)
            ]
          );
          break;

        case "NATL":
          articles.push(
            categories.nationalist[
              Math.floor(Math.random() * categories.nationalist.length)
            ]
          );
          break;

        case "INDV":
          articles.push(
            categories.individualist[
              Math.floor(Math.random() * categories.individualist.length)
            ]
          );
          break;

        case "ANCA":
          articles.push(
            categories.anarchoCapitalist[
              Math.floor(Math.random() * categories.anarchoCapitalist.length)
            ]
          );
          break;

        case "SJW":
          articles.push(
            categories.sjw[Math.floor(Math.random() * categories.sjw.length)]
          );
          break;

        case "RPLB":
          articles.push(
            categories.representativeLiberal[
              Math.floor(
                Math.random() * categories.representativeLiberal.length
              )
            ]
          );
          break;

        default:
          articles.push(
            categories.neutral[
              Math.floor(Math.random() * categories.neutral.length)
            ]
          );
          break;
      }
    }

    categories.neutral.length !== 0 &&
      articles.push(
        categories.neutral[
          Math.floor(Math.random() * categories.neutral.length)
        ]
      );
    categories.neutral.length !== 0 &&
      articles.push(
        categories.neutral[
          Math.floor(Math.random() * categories.neutral.length)
        ]
      );
    categories.conservative.length !== 0 &&
      articles.push(
        categories.conservative[
          Math.floor(Math.random() * categories.neutral.length)
        ]
      );
    categories.socialist.length !== 0 &&
      articles.push(
        categories.socialist[
          Math.floor(Math.random() * categories.neutral.length)
        ]
      );
    categories.nationalist.length !== 0 &&
      articles.push(
        categories.nationalist[
          Math.floor(Math.random() * categories.neutral.length)
        ]
      );
    categories.individualist.length !== 0 &&
      articles.push(
        categories.individualist[
          Math.floor(Math.random() * categories.neutral.length)
        ]
      );
    categories.anarchoCapitalist.length !== 0 &&
      articles.push(
        categories.anarchoCapitalist[
          Math.floor(Math.random() * categories.neutral.length)
        ]
      );
    categories.sjw.length !== 0 &&
      articles.push(
        categories.sjw[Math.floor(Math.random() * categories.neutral.length)]
      );
    categories.representativeLiberal.length !== 0 &&
      articles.push(
        categories.representativeLiberal[
          Math.floor(Math.random() * categories.neutral.length)
        ]
      );

    if (articles.length < 10) {
      for (let i = 0; i < 10 - articles.length; i++) {
        articles.push(
          categories.neutral[
            Math.floor(Math.random() * categories.neutral.length)
          ]
        );
      }
    }

    articles = [...new Set(articles)];

    response.json(articles.filter(article => article));
  });
});

const getArticleAlignment = async (title, content) => {
  const article = title + "\n" + content;

  const alignment = await axios.post("https://a-poll.herokuapp.com/classify", {
    content: article,
  });

  return getAlignmentFromLong(alignment.data.alignment);
};

exports.searchArticles = functions.https.onRequest(
  async (request, response) => {
    cors(request, response, async () => {
      const { otherSide } = request.body;
      const { query } = request.body;

      if (!query) {
        response.status(400);
        return response.json({ message: "Please provide a query" });
      }

      const news = await newsapi.v2.everything({
        q: query,

        langauge: "en",
        lang: "en",
      });

      let articles = news.articles.map(article => {
        article.publishedAt = new Date(article.publishedAt);
        return article;
      });

      if (otherSide) {
        articles = shuffle(articles);
      }

      articles.sort(
        (a, b) => a.publishedAt.getTime() > b.publishedAt.getTime()
      );

      return response.json(articles);
    });
    return;
  }
);
// get the function thingy

const checkNews = async (request, response) => {
  const news = await newsapi.v2.topHeadlines({
    sources: "bbc-news,the-verge",
    domains: "bbc.co.uk,theverge.com",
    langauge: "en",
  });

  const dbArticles = await admin
    .firestore()
    .collection("articles")
    .get()
    .then(data => data.docs.map(doc => doc.data()));

  const filteredArticles = news.articles.filter(article => {
    const hashString = article.title + article.description;
    const hash = crypto.createHash("md5").update(hashString).digest("hex");

    if (dbArticles.find(art => art.hash === hash)) return false;
    else return true;
  });

  const articles = filteredArticles.map(async pArticle => {
    const article = pArticle; // this is the filtered article with the alignment

    let alignment = await getArticleAlignment(
      article.title,
      article.description
    );

    const yes = Math.floor(Math.random() * 6);

    if (yes > 4) {
      alignment = "NTRL";
    }

    if (alignment === "NATL") {
      const yes = Math.floor(Math.random() * 3);
      if (yes > 1) alignment = "CONS";
    }

    const hashString = pArticle.title + pArticle.description;
    const hash = crypto.createHash("md5").update(hashString).digest("hex");

    article.hash = hash;
    article.alignment = alignment;
    article.publishedAt = new Date(article.publishedAt);

    admin.firestore().collection("articles").doc(hash).set(article);

    return article;
  });

  response.send(articles);

  return;
};

exports.testNews = functions.https.onRequest(checkNews);

exports.checkNews = functions.pubsub
  .schedule("every 30 minutes")
  .onRun(checkNews);
