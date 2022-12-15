/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '🔥',
    'I': '🧀',
    'PLAYER': '🐀',
    'COLLISION': '💥',
    'GAME_OVER': '💩',
    'WIN': '🏆',
    'HEART': '💛',
  };
  
  const maps = [];
  maps.push(`
    XXIXXXXXXX
    ---XXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    --XX---XXXX
    X--X-X-XXX
    XX---X-XXX
    XXXXXX--XX
    X------XXX
    XOXXXXXXXX
  `);
  maps.push(`
    XO-XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    XI----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);