# MongoDB database setup

The portfolio can use MongoDB Atlas for persistent content, admin credentials, and contact messages. The current Atlas cluster is `CoachingDB`.

## Render environment variable

In Render, add `MONGODB_URI` with the connection string from MongoDB Atlas. Keep the username and password URL-encoded when they contain special characters.

```env
MONGODB_URI=mongodb+srv://mockpanelofficial_db_user:<db_password>@coachingdb.8voiwml.mongodb.net/CoachingDB?retryWrites=true&w=majority&appName=CoachingDB
MONGODB_DB=ShreyanshSharma
```

Replace `<db_password>` with the password for `mockpanelofficial_db_user`. Do not include the angle brackets, and URL-encode special characters in the password.

The app always uses the `ShreyanshSharma` database name through `MONGODB_DB`, keeping its collections separate from other projects in the same Atlas project.

Also configure `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET` in Render. Never commit the real connection string or database credentials.

## Atlas checklist

1. Create a database user in Database Access.
2. Add Render's outbound IP access in Network Access, or use the Atlas-approved production access policy.
3. Copy the driver connection string from the `CoachingDB` cluster.
4. Replace the placeholders and add it as the Render `MONGODB_URI` secret.

Without `MONGODB_URI`, the app intentionally uses the local JSON files in `server/data` for development.

## Separate Vercel frontend

If the client is deployed separately on Vercel, set this Vercel environment variable before building:

```env
VITE_API_URL=https://shreyansh-sharma.onrender.com
```

Set Render `CLIENT_ORIGIN` to the exact Vercel frontend URL, or a comma-separated list containing it and the local URL, for example `https://your-site.vercel.app,http://localhost:5173`.
