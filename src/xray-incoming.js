/**
 * xray-incoming.js
 * Add JFrog Xray notifications via a new WebHook in Rocket.Chat
 * @license MIT
 * @version 0.2.0
 * @author  CrazyMax, https://github.com/crazy-max
 * @updated 2019-05-09
 * @link    https://github.com/crazy-max/rocketchat-xray
 */

/* globals console, _, s */

const USERNAME = 'Xray';
const AVATAR_URL = 'https://raw.githubusercontent.com/crazy-max/rocketchat-xray/master/res/avatar.png';

/* exported Script */
class Script {
  /**
   * @params {object} request
   */
  process_incoming_request({ request }) {
    let data = request.content;

    let attachmentColor = `#00569A`;
    if (data.top_severity == 'Medium') {
      attachmentColor = `#FB8C00`;
    } else if (data.top_severity == 'High') {
      attachmentColor = `#D73F3F`;
    }

    let attachmentText = `${data.issues.length} violation(s) with **${data.top_severity}** top severity for watch **${data.watch_name}** and policy **${data.policy_name}**`;

    return {
      content: {
        username: USERNAME,
        icon_url: AVATAR_URL,
        text: `${data.issues.length} violation(s) for watch **${data.watch_name}** and policy **${data.policy_name}** were found for **${data.issues[0].impacted_artifacts[0].path}${data.issues[0].impacted_artifacts[0].name}**`,
        attachments: [{
          text: attachmentText,
          color: attachmentColor
        }]
      }
    };
  }
}
