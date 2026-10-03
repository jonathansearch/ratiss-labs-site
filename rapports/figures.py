#!/usr/bin/env python3
"""Figures des rapports RATISS — matplotlib, valeurs ARCHIVÉES uniquement.

Règle du labo : aucun chiffre inventé. Toute valeur tracée provient de
RATISS-ARCHIVES (POUR-LA-PROCHAINE-SESSION.md, preuves/qpu/*.json).
Les schémas sans données sont explicitement étiquetés « schematic ».
Sortie : PDF vectoriels dans rapports/fig/
"""
from __future__ import annotations

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

FIG = Path(__file__).resolve().parent / "fig"
FIG.mkdir(parents=True, exist_ok=True)

ENCRE = "#03100f"
SARCELLE = "#0e6b66"
MENTHE = "#2dd4bf"
VIOLET = "#8b5cf6"
AMBRE = "#f97316"
ROSE = "#f43f5e"

plt.rcParams.update(
    {
        "font.family": "sans-serif",
        "font.size": 9,
        "axes.edgecolor": "#4a6f6b",
        "axes.labelcolor": ENCRE,
        "text.color": ENCRE,
        "xtick.color": "#4a6f6b",
        "ytick.color": "#4a6f6b",
        "axes.grid": True,
        "grid.color": "#d7e8e5",
        "grid.linewidth": 0.6,
        "figure.dpi": 200,
    }
)


def fig_photon() -> None:
    fig, ax = plt.subplots(figsize=(5.6, 3.1))
    labels = ["2 planes", "3 planes", "naive action"]
    vals = [95.92, 95.96, 96.77]  # E-CANTON, archived 27/09
    bars = ax.bar(labels, vals, color=[SARCELLE, MENTHE, VIOLET], width=0.55)
    ax.axhspan(95.0, 98.5, color=MENTHE, alpha=0.13, zorder=0)
    ax.axhline(95.0, color=SARCELLE, lw=0.8, ls="--")
    ax.text(2.42, 95.15, "Canton window 95–98.5 %", fontsize=7.5, color=SARCELLE, ha="right")
    ax.set_ylim(93, 98.8)
    ax.set_ylabel("Fidelity (%)")
    ax.set_title("E-CANTON: 8,396,800 equal-modulus paths (seed 20260927)", fontsize=9)
    for b, v in zip(bars, vals):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.08, f"{v:.2f}", ha="center", fontsize=8)
    ax.text(0.0, 93.35, "cross-check 96.06 % · intensity corr. 97.08–97.10 % · screen phase 5.4°",
            fontsize=7, color="#4a6f6b")
    fig.tight_layout()
    fig.savefig(FIG / "photon-canton.pdf")
    plt.close(fig)


def fig_qpu() -> None:
    fig, ax = plt.subplots(figsize=(5.8, 3.4))
    n_g = [3, 4, 5, 12]
    f_g = [94.5, 94.6, 88.5, 66.0]  # Garnet separated + chat-12
    n_c = [3, 4, 5]
    f_c = [89.7, 79.3, 68.7]  # Cepheus trilogy
    n_i = [2, 4]
    f_i = [99.61, 97.27]  # Bell, GHZ-4 ions (df23deac)
    ax.plot(n_g, f_g, "o-", color=SARCELLE, label="IQM Garnet (supercond., 2 Spark)")
    ax.plot(n_c, f_c, "s-", color=AMBRE, label="Rigetti Cepheus-1-108Q (1 Spark)")
    ax.plot(n_i, f_i, "D-", color=VIOLET, label="AQT IBEX Q1 (trapped ion, 15 Spark)")
    ax.annotate("GHZ-4 ions\n97.27 %", (4, 97.27), textcoords="offset points",
                xytext=(8, 6), fontsize=7.5, color=VIOLET)
    ax.annotate("chat-12\n66.0 %", (12, 66.0), textcoords="offset points",
                xytext=(-6, 8), fontsize=7.5, color=SARCELLE)
    ax.set_xlabel("Number of qubits in the GHZ state")
    ax.set_ylabel("Fidelity (%)")
    ax.set_ylim(60, 102)
    ax.set_title("GHZ fidelity decay per modality — 29/09/2026 runs, 1024 shots", fontsize=9)
    ax.legend(fontsize=7.2, loc="lower left", frameon=False)
    ax.text(0.98, 0.97, "ion slope ≈ −1.9 pt/qubit\n(local: −1.2 then −2.4)", transform=ax.transAxes,
            fontsize=7.2, ha="right", va="top", color=VIOLET)
    fig.tight_layout()
    fig.savefig(FIG / "qpu-ghz-decay.pdf")
    plt.close(fig)


def fig_navier() -> None:
    fig, ax = plt.subplots(figsize=(5.6, 2.5))
    ax.axis("off")
    boxes = [
        (0.02, "Sealed criteria\n(PARAMETRES-FIGES.md)"),
        (0.27, "SPH 3D run\n+ lagrangian tracers"),
        (0.52, "Sampling at\nevery time step"),
        (0.77, "SHA-256 seals\n+ JSON config"),
    ]
    for x, t in boxes:
        ax.add_patch(plt.Rectangle((x, 0.35), 0.20, 0.34, fill=True, facecolor="#e6f5f2",
                                   edgecolor=SARCELLE, lw=0.9, transform=ax.transAxes))
        ax.text(x + 0.10, 0.52, t, ha="center", va="center", fontsize=7.6, transform=ax.transAxes)
    for x, _ in boxes[:-1]:
        ax.annotate("", xy=(x + 0.245, 0.52), xytext=(x + 0.205, 0.52),
                    arrowprops=dict(arrowstyle="->", color=SARCELLE), transform=ax.transAxes)
    ax.text(0.5, 0.10, "Blow-up: Om_max = 5654.1668 — reproduced bit-for-bit (pointwise gap 0.0000)",
            ha="center", fontsize=8, transform=ax.transAxes, color=ENCRE)
    ax.text(0.5, 0.86, "SCHEMATIC — workflow diagram, not measured data",
            ha="center", fontsize=7, style="italic", color="#4a6f6b", transform=ax.transAxes)
    fig.tight_layout()
    fig.savefig(FIG / "navier-workflow.pdf")
    plt.close(fig)


def fig_etalons() -> None:
    fig, ax = plt.subplots(figsize=(5.4, 2.6))
    ax.barh(["E04-P4 measured\n(3D compressor)", "reference value"],
            [0.61403, 0.640], xerr=[0, 0.020], color=[ROSE, SARCELLE], height=0.5)
    ax.set_xlim(0.55, 0.70)
    ax.set_xlabel("Compression ratio")
    ax.set_title("E04-P4: finite size + partially crystalline state (ψ₆ = 0.827 / 0.935)", fontsize=8.5)
    ax.text(0.56, 0.62, "accepted red: hypothesis kept as a known bound", fontsize=7,
            color=ROSE, transform=ax.transAxes)
    fig.tight_layout()
    fig.savefig(FIG / "etalons-e04.pdf")
    plt.close(fig)


def fig_audit() -> None:
    fig, ax = plt.subplots(figsize=(5.6, 2.3))
    ax.axis("off")
    steps = [("job id\ndap8jg8pqr…", 0.03), ("id[:9]\nbase32 decode", 0.28),
             ("÷ 8192\n→ unix seconds", 0.53), ("compare with\nserver timestamp", 0.78)]
    for t, x in steps:
        ax.add_patch(plt.Rectangle((x, 0.38), 0.19, 0.34, facecolor="#fdf1e3",
                                   edgecolor=AMBRE, lw=0.9, transform=ax.transAxes))
        ax.text(x + 0.095, 0.55, t, ha="center", va="center", fontsize=7.6, transform=ax.transAxes)
    for _, x in steps[:-1]:
        ax.annotate("", xy=(x + 0.235, 0.55), xytext=(x + 0.195, 0.55),
                    arrowprops=dict(arrowstyle="->", color=AMBRE), transform=ax.transAxes)
    ax.text(0.5, 0.12, "median gap 278 ms over 66 timestamped payloads · 86 ids · 12/08 → 23/09/2026",
            ha="center", fontsize=8, transform=ax.transAxes)
    ax.text(0.5, 0.88, "SCHEMATIC — decoding pipeline, not measured data",
            ha="center", fontsize=7, style="italic", color="#4a6f6b", transform=ax.transAxes)
    fig.tight_layout()
    fig.savefig(FIG / "audit-decode.pdf")
    plt.close(fig)


if __name__ == "__main__":
    fig_photon()
    fig_qpu()
    fig_navier()
    fig_etalons()
    fig_audit()
    print("✅ 5 figures →", FIG)
    for p in sorted(FIG.glob("*.pdf")):
        print("   ", p.name, p.stat().st_size, "octets")
