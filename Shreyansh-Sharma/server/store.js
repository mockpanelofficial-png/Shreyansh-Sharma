const fs = require('fs');
const path = require('path');
const Content = require('./models/Content');
const file = path.join(__dirname, 'data', 'db.json');
let mongoReady = false;

const readSeed = () => JSON.parse(fs.readFileSync(file, 'utf8'));

const normalize = (data) => {
  data.site.linkedin ||= 'https://www.linkedin.com/in/doctor-sharma-junior/';
  data.items = data.items.map((x) => ({
    ...x,
    customId: x.customId || x.id || String(Date.now() + Math.random()),
    proofs: (x.proofs || []).map((p) => (p.url ? p : { name: p.name, type: p.type, url: p.data || '' })),
  }));
  return data;
};

const needsRepair = (doc) =>
  !doc?.site?.profileCards?.length || !doc?.site?.sections || !doc?.site?.meta;

const mergeSite = (current = {}, seed = {}) => ({
  ...seed,
  ...current,
  sections: { ...(seed.sections || {}), ...(current.sections || {}) },
  meta: { ...(seed.meta || {}), ...(current.meta || {}) },
  profileCards: current.profileCards?.length ? current.profileCards : seed.profileCards || [],
  skills: current.skills?.length ? current.skills : seed.skills || [],
  interests: current.interests?.length ? current.interests : seed.interests || [],
  roles: current.roles?.length ? current.roles : seed.roles || [],
  ticker: current.ticker?.length ? current.ticker : seed.ticker || [],
});

exports.setMongoReady = (v) => {
  mongoReady = v;
};

exports.get = async () => {
  if (mongoReady) {
    const seed = normalize(readSeed());
    let doc = await Content.findOne({ key: 'main' }).lean();

    if (!doc) {
      doc = (await Content.create({ ...seed, key: 'main' })).toObject();
      return doc;
    }

    if (needsRepair(doc)) {
      doc = await Content.findOneAndUpdate(
        { key: 'main' },
        {
          $set: {
            site: mergeSite(doc.site, seed.site),
            timeline: doc.timeline?.length ? doc.timeline : seed.timeline,
            items: doc.items?.length ? doc.items : seed.items,
          },
        },
        { new: true }
      ).lean();
    }

    return doc;
  }

  return normalize(readSeed());
};

exports.set = async (data) => {
  data = normalize(data);
  if (mongoReady) {
    return Content.findOneAndUpdate(
      { key: 'main' },
      { $set: { site: data.site, timeline: data.timeline, items: data.items } },
      { new: true, upsert: true }
    ).lean();
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  return data;
};
