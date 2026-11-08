export const integrations = [
  {id:'github',name:'GitHub',category:'Development',description:'Send new public releases to your updates channel.',format:'owner/repository',setup:'Add the public repository and choose a channel. Drafts and prereleases are skipped.'},
  {id:'youtube',name:'YouTube',category:'Social',description:'Let your community know when a new video lands.',format:'YouTube channel ID',setup:'Use a public channel ID starting with UC. Upload alerts use YouTube’s public feed; live-stream detection is separate.'},
  {id:'twitch',name:'Twitch',category:'Social',description:'Post an alert when your chosen streamer goes live.',format:'Twitch username',setup:'The host needs TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET. Add a username and channel in Manta. Alerts are checked every 15 minutes.'},
  {id:'reddit',name:'Reddit',category:'Social',description:'Bring new subreddit posts into the conversation.',format:'Subreddit name',setup:'Choose a public subreddit. Reddit can restrict automated feed requests; delivery errors appear in the dashboard.'},
  {id:'steam',name:'Steam',category:'Games & news',description:'Keep up with game updates and patch notes.',format:'Steam app ID',setup:'Enter the game’s numeric app ID and choose where news should go. This posts news; it adds no games or leveling to Manta.'},
  {id:'wordpress',name:'WordPress',category:'Publishing',description:'Publish your blog’s latest posts to Discord.',format:'Public HTTPS feed URL',setup:'Use the site’s public RSS URL, usually ending in /feed/. Password-protected feeds are not supported.'},
  {id:'medium',name:'Medium',category:'Publishing',description:'Share new stories from a public author feed.',format:'Medium username',setup:'Enter the author’s username without @. Only public feed entries are available.'},
  {id:'mastodon',name:'Mastodon',category:'Social',description:'Follow public account posts from your instance.',format:'Public account RSS URL',setup:'Use the account’s public .rss URL. Private and followers-only posts are never requested.'},
  {id:'rss',name:'RSS / Atom',category:'Publishing',description:'Follow news sites, podcasts and public changelogs.',format:'Public HTTPS RSS or Atom URL',setup:'Add a public RSS or Atom feed. Manta blocks private networks and checks redirects before fetching.'},
  {id:'zapier',name:'Zapier',category:'Automation',description:'Send an hourly activity summary to a Catch Hook.',format:'Zapier Catch Hook URL',setup:'Create a Catch Hook in Zapier, then add its HTTPS URL. Manta sends aggregate activity counts. Zapier’s own plan limits apply.'},
  {id:'make',name:'Make',category:'Automation',description:'Use server activity in a Make scenario.',format:'Make custom webhook URL',setup:'Create a custom webhook in Make and paste its HTTPS URL into Manta. Summaries include counts, without message text or member IDs.'},
  {id:'webhook',name:'Webhooks / n8n',category:'Automation',description:'Route activity summaries into your own workflow.',format:'Public HTTPS endpoint',setup:'Use a public JSON webhook, including a self-hosted n8n endpoint. Manta encrypts the destination URL at rest using the host’s session secret.'}
];
export const commands = [
  {name:'/manage',category:'Moderation',description:'Warn, timeout, kick, ban or leave a private staff note.',permission:'Staff'},
  {name:'/cases',category:'Moderation',description:'Review the recorded moderation history for a member.',permission:'Staff'},
  {name:'/report',category:'Moderation',description:'Send a private report to your staff team.',permission:'Members'},
  {name:'/appeal',category:'Moderation',description:'Ask staff to reconsider one of your cases.',permission:'Members'},
  {name:'/ticket',category:'Community',description:'Open a private support channel.',permission:'Members'},
  {name:'/role',category:'Community',description:'Pick an approved self-service role.',permission:'Members'},
  {name:'/stats',category:'Community',description:'Check your recent message and voice activity.',permission:'Members'}
];
export function filterItems(items,category,query) {
  const term=query.trim().toLowerCase();
  return items.filter(item=>(category==='All'||item.category===category)&&`${item.name} ${item.description}`.toLowerCase().includes(term));
}
