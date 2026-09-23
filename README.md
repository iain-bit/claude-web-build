# claude-web-build

Website build via Claude for Lumiq Talent.

## Getting started

This repository is in early setup. Add project-specific setup instructions here as the build takes shape.

## Jobs (JobAdder XML feed)

JobAdder HTTP-posts our live job ads as raw XML to `/api/jobadder-feed`
whenever a job on the website board changes. The endpoint checks HTTP Basic
auth, stores the file in Vercel Blob, and refreshes `/jobs` and
`/jobs/[slug]` straight away.

Vercel setup:

- Connect a private Vercel Blob store to the project (adds `BLOB_STORE_ID`;
  auth is via Vercel OIDC).
- Set `JOBADDER_FEED_USER` and `JOBADDER_FEED_PASSWORD` — the same details
  given to JobAdder support.

Until the first feed arrives, `/jobs` shows a "get in touch" message.
