from typing import List, Dict, Any
from collections import defaultdict
import datetime

class CDRIntelligenceAnalyzer:
    """
    Law enforcement Call Detail Record (CDR) & IPDR Pattern Analyzer.
    Detects burner phone meshes, nocturnal communication bursts, and IMEI cloning.
    """

    def analyze_cdr_records(self, records: List[Dict[str, Any]] = None) -> Dict[str, Any]:
        # If no custom records provided, generate realistic forensic CDR telemetry
        if not records:
            records = self._generate_sample_cdr()

        call_counts = defaultdict(int)
        duration_sums = defaultdict(int)
        night_calls = defaultdict(int) # Between 00:00 and 05:00
        imei_map = defaultdict(set)

        for rec in records:
            pair = tuple(sorted([rec["caller"], rec["receiver"]]))
            call_counts[pair] += 1
            duration_sums[pair] += rec.get("duration_sec", 60)
            
            # Check time
            ts_str = rec.get("timestamp", "2026-09-17 02:30:00")
            try:
                hour = int(ts_str.split()[1].split(":")[0])
                if 0 <= hour <= 5:
                    night_calls[pair] += 1
            except Exception:
                pass

            if "imei" in rec and rec["imei"]:
                imei_map[rec["caller"]].add(rec["imei"])

        # Format Top Communication Pairs
        top_pairs = []
        for pair, count in sorted(call_counts.items(), key=lambda x: x[1], reverse=True)[:10]:
            top_pairs.append({
                "party_a": pair[0],
                "party_b": pair[1],
                "total_calls": count,
                "total_duration_minutes": round(duration_sums[pair] / 60.0, 1),
                "night_calls_count": night_calls.get(pair, 0),
                "suspicion_index": "HIGH" if night_calls.get(pair, 0) > 10 or count > 50 else "MEDIUM"
            })

        # Burner Phone / IMEI alerts
        burner_alerts = []
        for caller, imeis in imei_map.items():
            if len(imeis) > 1:
                burner_alerts.append({
                    "phone_number": caller,
                    "imei_count": len(imeis),
                    "detected_imeis": list(imeis),
                    "alert_type": "MULTIPLE_HANDSETS_SINGLE_SIM",
                    "severity": "CRITICAL"
                })

        return {
            "total_records_analyzed": len(records),
            "unique_phone_numbers": len(set([r["caller"] for r in records] + [r["receiver"] for r in records])),
            "top_calling_pairs": top_pairs,
            "burner_phone_alerts": burner_alerts,
            "hourly_distribution": self._calculate_hourly_dist(records)
        }

    def _calculate_hourly_dist(self, records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        hourly = [0] * 24
        for r in records:
            try:
                hour = int(r.get("timestamp", "2026-09-17 12:00:00").split()[1].split(":")[0])
                hourly[hour] += 1
            except Exception:
                pass
        return [{"hour": f"{h:02d}:00", "calls": hourly[h]} for h in range(24)]

    def _generate_sample_cdr(self) -> List[Dict[str, Any]]:
        sample = []
        # Burner 1 to Burner 2 late night calls
        for i in range(1, 45):
            sample.append({
                "caller": "+91-98110-XXXXX (Iqbal)",
                "receiver": "+91-98220-XXXXX (Vicky)",
                "duration_sec": 180 + (i * 10),
                "timestamp": f"2026-09-{(i%15)+1:02d} 02:{(i*3)%60:02d}:15",
                "cell_tower": "TOWER-DEL-ROHINI-04",
                "imei": "864290045192831" if i < 25 else "864290045192999"
            })
        for i in range(1, 25):
            sample.append({
                "caller": "+91-98220-XXXXX (Vicky)",
                "receiver": "+91-98440-XXXXX (Rashid Doctor)",
                "duration_sec": 95 + (i * 5),
                "timestamp": f"2026-09-{(i%15)+1:02d} 03:{(i*2)%60:02d}:40",
                "cell_tower": "TOWER-DEL-CHANDNI-01",
                "imei": "359870023419088"
            })
        return sample

cdr_analyzer = CDRIntelligenceAnalyzer()
