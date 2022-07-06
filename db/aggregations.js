const Article = require("../models/Article.model")

const matchArticlesLookupCities = [
  {
    $match: {
      private: false,
    },
  },
  {
    $lookup: {
      from: "cities",
      localField: "city",
      foreignField: "_id",
      as: "city",
    },
  },
  {
    $unwind: "$city",
  },
]

const getUniqueCountries = () => {
  const query = [
    ...matchArticlesLookupCities,
    {
      $lookup: {
        from: "countries",
        localField: "city.country",
        foreignField: "_id",
        as: "countryLookup",
      },
    },
    {
      $group: {
        _id: "$countryLookup.countryName",
        cca2: {
          $addToSet: "$countryLookup.countryCca2",
        },
      },
    },
    {
      $unwind: {
        path: "$_id",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $unwind: {
        path: "$cca2",
      },
    },
    {
      $unwind: {
        path: "$cca2",
      },
    },
  ]

  return Article.aggregate(query)
}

const getArticlesFilteredByCountries = async (countryCodes) => {
  const query = [
    ...matchArticlesLookupCities,
    {
      $lookup: {
        from: "countries",
        localField: "city.country",
        foreignField: "_id",
        as: "country",
        let: {
          countryCodes,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$countryCca2", "$$countryCodes"],
              },
            },
          },
          {
            $project: {
              _id: "$$REMOVE",
              countryName: "$countryName",
              countryCca2: "$countryCca2",
            },
          },
        ],
      },
    },
    {
      $unwind: "$country",
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
        pipeline: [
          {
            $project: {
              _id: "$$REMOVE",
              username: "$username",
              name: "$name",
              image: "$image",
            },
          },
        ],
      },
    },
    {
      $unwind: "$author",
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        _id: "$_id",
        title: "$title",
        description: "$description",
        city: {
          cityName: "$city.cityName",
          country: "$country",
        },
        author: "$author",
        image: "$image",
        createdAt: "$createdAt",
      },
    },
  ]
  return Article.aggregate(query)
}

module.exports = {
  getUniqueCountries,
  getArticlesFilteredByCountries,
}
