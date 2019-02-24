import path from 'path';

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    // get unread messages
    const direct = document.querySelectorAll('[class^="guildsWrapper"] [class*="badge"]').length;
    const indirect = document.querySelectorAll('[class^="guildsWrapper"] [class^="guild-"][class*="unread-"]').length;

    // set Franz badge
    Franz.setBadge(direct, indirect);
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);

  // Hide download message
  Franz.injectCSS(path.join(__dirname, 'service.css'));
};
