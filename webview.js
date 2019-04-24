import path from 'path';

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    // get unread messages
    const serverbar = document.querySelector('[class^=unreadMentionsIndicatorTop] + div');
    if (!serverbar) return;
    const direct = serverbar.querySelectorAll('[class*="lowerBadge"]').length;
    const indirect = 0;

    // set Franz badge
    Franz.setBadge(direct, indirect);
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);

  // Hide download message
  Franz.injectCSS(path.join(__dirname, 'service.css'));
};
