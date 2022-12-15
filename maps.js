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
  maps.push(`
    XXXXXXXXOX
    XXXXX-X--X
    XXXXXX--XX
    XX-XX--XXX
    XXXX--XXXX
    XXX--X-XXX
    XX--XXXXXX
    XX-XXXXXXX
    XX-----IXX
    XXXXXXXXXX
  `);
  maps.push(`
    XXX------X
    XXX-XXX-XX
    XX--XXX-XX
    XX-XX---XX
    XXIX--XXXX
    XXX----XXX
    XXX-XXXXXX
    XXX-XXXXXX
    XXX----OXX
    XXXXXXXXXX
  `);