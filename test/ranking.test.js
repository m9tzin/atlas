import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatRanking, formatStatsFromLast30 } from '../src/services/faceitService.js';

const playerData = {
  nickname: 'tester',
  games: { cs2: { faceit_elo: 3250, skill_level: 10, region: 'SA' } }
};
const stats = { avgKills: 18, kd: '1.25', hsPercent: 48, winrate: 55 };

describe('formatRanking', () => {
  it('returns empty string when not ranked', () => {
    assert.equal(formatRanking(null), '');
  });

  it('formats position and region', () => {
    assert.equal(formatRanking({ position: 523, region: 'SA' }), '#523 SA');
  });
});

describe('formatStatsFromLast30', () => {
  it('omits Rank when there is no ranking', () => {
    const out = formatStatsFromLast30(playerData, stats);
    assert.equal(
      out,
      'tester: | ELO: 3250 | Level: 10 | Avg Kills: 18 | K/D: 1.25 | HS%: 48% | Winrate: 55%'
    );
  });

  it('places Rank right after ELO when ranked', () => {
    const out = formatStatsFromLast30(playerData, stats, { position: 523, region: 'SA' });
    assert.match(out, /ELO: 3250 \| Rank: #523 SA \| Level: 10/);
  });
});
