import path from 'path';

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    // get direct messages
    let direct = 0;
    const guildDirect = document.querySelectorAll('.guilds-wrapper .badge');
    direct += getAlertCount(guildDirect);
    const channelDirect = document.querySelectorAll('[class^="nameUnreadText-"]+div>div>div');
    direct += getAlertCount(channelDirect);
    
    // get indirect messages
    let indirect = document.querySelectorAll('.guilds-wrapper .unread').length;
    indirect += document.querySelectorAll('[class^="nameUnreadText-"]').length;

    // set Franz badge
    Franz.setBadge(direct, indirect);
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);

  // Hide download message
  Franz.injectCSS(path.join(__dirname, 'service.css'));
  
  // Parse alert count from badges
  function getAlertCount(badges) {
    let alerts = 0;
    for(let i = 0; i < badges.length; i++) {
      const badge = badges[i];
      if(badge && badge.childNodes && badge.childNodes.length > 0) {
        const count = parseInt(badge.childNodes[0].nodeValue, 10);
        alerts += count.isNaN ? 1 : count;
      } else {
        alerts++;
      }
    }
    return alerts;
  };
};
