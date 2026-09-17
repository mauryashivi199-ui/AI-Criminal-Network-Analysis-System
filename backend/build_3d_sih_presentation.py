import os, shutil
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Paths
IMG_DIR = r"C:\Users\maury\.gemini\antigravity\brain\df690268-b65b-42b1-99c3-e5976b97b9d2"
DOCS_DIR = r"c:\Users\maury\OneDrive\Desktop\KavachNet-AI\docs"
os.makedirs(DOCS_DIR, exist_ok=True)

img_sphere = os.path.join(DOCS_DIR, "3d_graph_sphere.jpg")
img_pipeline = os.path.join(DOCS_DIR, "3d_tech_pipeline.jpg")
img_shield = os.path.join(DOCS_DIR, "3d_cyber_shield.jpg")

def build_perfect_sih_deck(output_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color definitions matching SIH 2026 exactly
    COLOR_BG = RGBColor(248, 249, 250)
    COLOR_WHITE = RGBColor(255, 255, 255)
    COLOR_DARK = RGBColor(15, 23, 42)
    COLOR_MUTED = RGBColor(100, 116, 139)
    COLOR_PRIMARY = RGBColor(14, 116, 144)
    COLOR_BLUE = RGBColor(37, 99, 235)
    COLOR_GREEN = RGBColor(16, 185, 129)
    COLOR_AMBER = RGBColor(245, 158, 11)
    COLOR_ORANGE = RGBColor(249, 115, 22)
    COLOR_PURPLE = RGBColor(139, 92, 246)
    COLOR_CARD_BORDER = RGBColor(226, 232, 240)
    COLOR_LINE_GREEN = RGBColor(101, 163, 13)

    def add_base_elements(slide, slide_num=""):
        # Background
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_BG
        bg.line.fill.background()

        # Top Header Bar
        txBox = slide.shapes.add_textbox(Inches(0.6), Inches(0.32), Inches(8.0), Inches(0.45))
        tf = txBox.text_frame
        p = tf.paragraphs[0]
        p.text = "SMART INDIA HACKATHON 2026"
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = COLOR_DARK

        # Top Right Badge
        if slide_num:
            badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(11.8), Inches(0.32), Inches(0.95), Inches(0.35))
            badge.fill.solid()
            badge.fill.fore_color.rgb = RGBColor(238, 242, 255)
            badge.line.color.rgb = RGBColor(199, 210, 254)
            tf_b = badge.text_frame
            p_b = tf_b.paragraphs[0]
            p_b.text = slide_num
            p_b.font.size = Pt(10)
            p_b.font.bold = True
            p_b.font.color.rgb = COLOR_BLUE
            p_b.alignment = PP_ALIGN.CENTER
        else:
            badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(11.2), Inches(0.32), Inches(1.55), Inches(0.35))
            badge.fill.solid()
            badge.fill.fore_color.rgb = COLOR_ORANGE
            badge.line.fill.background()
            tf_b = badge.text_frame
            p_b = tf_b.paragraphs[0]
            p_b.text = "SOFTWARE EDITION"
            p_b.font.size = Pt(9)
            p_b.font.bold = True
            p_b.font.color.rgb = COLOR_WHITE
            p_b.alignment = PP_ALIGN.CENTER

        # Bottom Green Line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.6), Inches(7.0), Inches(12.133), Inches(0.04))
        line.fill.solid()
        line.fill.fore_color.rgb = COLOR_LINE_GREEN
        line.line.fill.background()

        # Footer Text
        footerBox = slide.shapes.add_textbox(Inches(0.6), Inches(7.05), Inches(12.133), Inches(0.35))
        tf_f = footerBox.text_frame
        p_f = tf_f.paragraphs[0]
        p_f.text = "@SIH Idea submission – Template                       Team Nexora                                              30 September 2026"
        p_f.font.size = Pt(9)
        p_f.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 1: TITLE SLIDE (3D Centerpiece + Metadata)
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    add_base_elements(slide1, "")

    # Left Container Card
    card1 = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(0.95), Inches(7.9), Inches(5.8))
    card1.fill.solid()
    card1.fill.fore_color.rgb = COLOR_WHITE
    card1.line.color.rgb = COLOR_CARD_BORDER

    # Problem Statement ID Badge
    ps_badge = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(1.15), Inches(3.0), Inches(0.32))
    ps_badge.fill.solid()
    ps_badge.fill.fore_color.rgb = RGBColor(239, 246, 255)
    ps_badge.line.color.rgb = RGBColor(191, 219, 254)
    tf_ps = ps_badge.text_frame
    p_ps = tf_ps.paragraphs[0]
    p_ps.text = "PROBLEM STATEMENT ID: SIH26189/500"
    p_ps.font.size = Pt(8.5)
    p_ps.font.bold = True
    p_ps.font.color.rgb = COLOR_BLUE

    # Title & Subtitle
    t_box = slide1.shapes.add_textbox(Inches(0.9), Inches(1.55), Inches(7.3), Inches(1.5))
    tf_t = t_box.text_frame
    tf_t.word_wrap = True
    p1 = tf_t.paragraphs[0]
    p1.text = "AI-Powered Criminal Network\nAnalysis System"
    p1.font.size = Pt(22)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_DARK
    p1.space_after = Pt(4)

    p2 = tf_t.add_paragraph()
    p2.text = "Heterogeneous Graph Intelligence & Link Analysis for Syndicate Discovery"
    p2.font.size = Pt(11)
    p2.font.color.rgb = COLOR_MUTED

    # 3D Graph Sphere Render
    if os.path.exists(img_sphere):
        pic1 = slide1.shapes.add_picture(img_sphere, Inches(0.9), Inches(3.0), width=Inches(7.3), height=Inches(3.5))

    # Right Metadata Cards
    metas = [
        ("ORGANIZATION / MINISTRY", "Ministry of Home Affairs (MHA)", COLOR_AMBER, Inches(0.95)),
        ("THEME", "Blockchain & Cybersecurity", COLOR_BLUE, Inches(2.97)),
        ("TEAM NAME", "Team Nexora", COLOR_GREEN, Inches(5.0))
    ]
    for m_label, m_val, m_col, m_y in metas:
        mc = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.7), m_y, Inches(4.03), Inches(1.75))
        mc.fill.solid()
        mc.fill.fore_color.rgb = COLOR_WHITE
        mc.line.color.rgb = COLOR_CARD_BORDER
        stripe = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.7), m_y, Inches(0.08), Inches(1.75))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = m_col
        stripe.line.fill.background()
        tf_mc = mc.text_frame
        tf_mc.margin_left = Inches(0.2)
        p_mcl = tf_mc.paragraphs[0]
        p_mcl.text = m_label
        p_mcl.font.size = Pt(9)
        p_mcl.font.bold = True
        p_mcl.font.color.rgb = COLOR_MUTED
        p_mcv = tf_mc.add_paragraph()
        p_mcv.text = m_val
        p_mcv.font.size = Pt(13)
        p_mcv.font.bold = True
        p_mcv.font.color.rgb = m_col if m_label != "ORGANIZATION / MINISTRY" else COLOR_DARK

    # =========================================================================
    # SLIDE 2: PROPOSED SOLUTION (3D Architecture Diagram & Highlights)
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_base_elements(slide2, "SLIDE 02")

    s2_title = slide2.shapes.add_textbox(Inches(0.6), Inches(0.85), Inches(12.0), Inches(0.4))
    s2_title.text_frame.paragraphs[0].text = "PROPOSED SOLUTION"
    s2_title.text_frame.paragraphs[0].font.size = Pt(20)
    s2_title.text_frame.paragraphs[0].font.bold = True
    s2_title.text_frame.paragraphs[0].font.color.rgb = COLOR_DARK

    # Main Visual Canvas Box
    d_card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.35), Inches(12.133), Inches(3.7))
    d_card.fill.solid()
    d_card.fill.fore_color.rgb = COLOR_WHITE
    d_card.line.color.rgb = COLOR_CARD_BORDER

    # 3D Tech Pipeline Graphic (Left side of container)
    if os.path.exists(img_pipeline):
        slide2.shapes.add_picture(img_pipeline, Inches(0.8), Inches(1.45), width=Inches(6.4), height=Inches(3.5))

    # Right Side Architectural Points
    right_box = slide2.shapes.add_textbox(Inches(7.4), Inches(1.45), Inches(5.1), Inches(3.5))
    tf_rb = right_box.text_frame
    tf_rb.word_wrap = True
    
    p_rb_h = tf_rb.paragraphs[0]
    p_rb_h.text = "❖ HETEROGENEOUS GRAPH AI WORKFLOW"
    p_rb_h.font.size = Pt(11)
    p_rb_h.font.bold = True
    p_rb_h.font.color.rgb = COLOR_PRIMARY
    p_rb_h.space_after = Pt(8)

    points = [
        ("1. Multi-Modal Ingestion:", "Parses CDR logs, CCTNS FIRs & crypto wallets into a unified graph."),
        ("2. Graph AI Reasoning:", "Temporal GNNs + Betweenness Centrality uncover hidden kingpins."),
        ("3. Immutable Audit Ledger:", "Tamper-proof blockchain hashing for court admissibility (BSA 2023).")
    ]
    for p_t, p_b in points:
        pt = tf_rb.add_paragraph()
        pt.text = f"{p_t} {p_b}"
        pt.font.size = Pt(10)
        pt.font.color.rgb = COLOR_DARK
        pt.space_after = Pt(6)

    # 3 Bottom Pillars (Concise)
    pillars = [
        ("✓ Multi-Source Ingestion", "Automated ingestion of police, telco, and crypto feeds.", COLOR_PRIMARY),
        ("✓ Zero Manual Silos", "Replaces manual cross-referencing with instant AI links.", COLOR_BLUE),
        ("✓ Temporal Link Prediction", "Predicts emerging criminal operations dynamically.", COLOR_PURPLE)
    ]
    for idx, (p_title, p_desc, p_col) in enumerate(pillars):
        x = Inches(0.6) + idx * Inches(4.14)
        p_card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(5.2), Inches(3.85), Inches(1.55))
        p_card.fill.solid()
        p_card.fill.fore_color.rgb = COLOR_WHITE
        p_card.line.color.rgb = COLOR_CARD_BORDER
        tb = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(5.2), Inches(3.85), Inches(0.06))
        tb.fill.solid()
        tb.fill.fore_color.rgb = p_col
        tb.line.fill.background()
        tf_pc = p_card.text_frame
        p_pct = tf_pc.paragraphs[0]
        p_pct.text = p_title
        p_pct.font.size = Pt(11)
        p_pct.font.bold = True
        p_pct.font.color.rgb = p_col
        p_pcd = tf_pc.add_paragraph()
        p_pcd.text = p_desc
        p_pcd.font.size = Pt(9.5)
        p_pcd.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 3: TECHNICAL APPROACH
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_base_elements(slide3, "SLIDE 03")

    s3_title = slide3.shapes.add_textbox(Inches(0.6), Inches(0.85), Inches(12.0), Inches(0.4))
    s3_title.text_frame.paragraphs[0].text = "TECHNICAL APPROACH"
    s3_title.text_frame.paragraphs[0].font.size = Pt(20)
    s3_title.text_frame.paragraphs[0].font.bold = True
    s3_title.text_frame.paragraphs[0].font.color.rgb = COLOR_DARK

    badges = [
        ("⚙ Python / PyTorch Geometric", COLOR_DARK),
        ("🗄 Neo4j Graph DB", COLOR_PRIMARY),
        ("⛓ Hyperledger Fabric", COLOR_GREEN),
        ("💻 FastAPI & React.js", COLOR_PURPLE)
    ]
    for b_idx, (b_text, b_color) in enumerate(badges):
        bx = Inches(0.6) + b_idx * Inches(3.08)
        badge_s = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, Inches(1.35), Inches(2.95), Inches(0.38))
        badge_s.fill.solid()
        badge_s.fill.fore_color.rgb = b_color
        badge_s.line.fill.background()
        tf_bs = badge_s.text_frame
        p_bs = tf_bs.paragraphs[0]
        p_bs.text = b_text
        p_bs.font.size = Pt(9.5)
        p_bs.font.bold = True
        p_bs.font.color.rgb = COLOR_WHITE
        p_bs.alignment = PP_ALIGN.CENTER

    steps = [
        ("STEP 01", "Data Ingestion", "Parses CDR, FIRs, OSINT, and crypto transaction feeds.", COLOR_PRIMARY),
        ("STEP 02", "Graph Embedding", "Entity resolution via PyTorch GNN & Node2Vec algorithms.", COLOR_BLUE),
        ("STEP 03", "Cluster Analysis", "Louvain community detection identifies core syndicates.", COLOR_PURPLE),
        ("STEP 04", "Blockchain Audit", "Logs tamper-proof evidence hashes to Hyperledger.", COLOR_GREEN)
    ]
    for s_idx, (st_num, st_title, st_desc, st_col) in enumerate(steps):
        sx = Inches(0.6) + s_idx * Inches(3.08)
        sc = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx, Inches(1.95), Inches(2.9), Inches(4.8))
        sc.fill.solid()
        sc.fill.fore_color.rgb = COLOR_WHITE
        sc.line.color.rgb = COLOR_CARD_BORDER if s_idx != 3 else COLOR_BLUE
        if s_idx == 3:
            sc.line.width = Pt(1.5)

        tag = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx + Inches(0.2), Inches(2.2), Inches(1.0), Inches(0.3))
        tag.fill.solid()
        tag.fill.fore_color.rgb = RGBColor(241, 245, 249)
        tag.line.fill.background()
        tf_tag = tag.text_frame
        p_tg = tf_tag.paragraphs[0]
        p_tg.text = st_num
        p_tg.font.size = Pt(8.5)
        p_tg.font.bold = True
        p_tg.font.color.rgb = st_col
        p_tg.alignment = PP_ALIGN.CENTER

        st_box = slide3.shapes.add_textbox(sx + Inches(0.15), Inches(2.7), Inches(2.6), Inches(0.7))
        tf_st = st_box.text_frame
        tf_st.word_wrap = True
        p_st = tf_st.paragraphs[0]
        p_st.text = st_title
        p_st.font.size = Pt(12)
        p_st.font.bold = True
        p_st.font.color.rgb = COLOR_DARK

        sd_box = slide3.shapes.add_textbox(sx + Inches(0.15), Inches(3.5), Inches(2.6), Inches(2.8))
        tf_sd = sd_box.text_frame
        tf_sd.word_wrap = True
        p_sd = tf_sd.paragraphs[0]
        p_sd.text = st_desc
        p_sd.font.size = Pt(10)
        p_sd.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 4: FEASIBILITY AND VIABILITY
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_base_elements(slide4, "SLIDE 04")

    s4_title = slide4.shapes.add_textbox(Inches(0.6), Inches(0.85), Inches(12.0), Inches(0.4))
    s4_title.text_frame.paragraphs[0].text = "FEASIBILITY AND VIABILITY"
    s4_title.text_frame.paragraphs[0].font.size = Pt(20)
    s4_title.text_frame.paragraphs[0].font.bold = True
    s4_title.text_frame.paragraphs[0].font.color.rgb = COLOR_DARK

    # Left Container: Feasibility
    f_left = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.4), Inches(5.9), Inches(5.3))
    f_left.fill.solid()
    f_left.fill.fore_color.rgb = COLOR_WHITE
    f_left.line.color.rgb = COLOR_CARD_BORDER
    fl_h = slide4.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(5.5), Inches(0.35))
    fl_h.text_frame.paragraphs[0].text = "✔ Feasibility Pillars"
    fl_h.text_frame.paragraphs[0].font.size = Pt(13)
    fl_h.text_frame.paragraphs[0].font.bold = True
    fl_h.text_frame.paragraphs[0].font.color.rgb = COLOR_GREEN

    fl_i1 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(2.1), Inches(5.3), Inches(2.0))
    fl_i1.fill.solid()
    fl_i1.fill.fore_color.rgb = RGBColor(248, 250, 252)
    fl_i1.line.color.rgb = COLOR_CARD_BORDER
    tf_fli1 = fl_i1.text_frame
    p_fli1 = tf_fli1.paragraphs[0]
    p_fli1.text = "Technical Feasibility"
    p_fli1.font.size = Pt(11)
    p_fli1.font.bold = True
    p_fli1.font.color.rgb = COLOR_BLUE
    p_fli1_d = tf_fli1.add_paragraph()
    p_fli1_d.text = "Built using production-grade open-source tools (PyTorch, Neo4j, Docker)."
    p_fli1_d.font.size = Pt(9.5)
    p_fli1_d.font.color.rgb = COLOR_MUTED

    fl_i2 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(4.3), Inches(5.3), Inches(2.0))
    fl_i2.fill.solid()
    fl_i2.fill.fore_color.rgb = RGBColor(248, 250, 252)
    fl_i2.line.color.rgb = COLOR_CARD_BORDER
    tf_fli2 = fl_i2.text_frame
    p_fli2 = tf_fli2.paragraphs[0]
    p_fli2.text = "Operational Feasibility"
    p_fli2.font.size = Pt(11)
    p_fli2.font.bold = True
    p_fli2.font.color.rgb = COLOR_BLUE
    p_fli2_d = tf_fli2.add_paragraph()
    p_fli2_d.text = "Seamless REST API integration with police CCTNS & NATGRID portals."
    p_fli2_d.font.size = Pt(9.5)
    p_fli2_d.font.color.rgb = COLOR_MUTED

    # Right Container: Risk & Mitigation
    f_right = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.4), Inches(5.9), Inches(5.3))
    f_right.fill.solid()
    f_right.fill.fore_color.rgb = COLOR_WHITE
    f_right.line.color.rgb = COLOR_CARD_BORDER
    fr_h = slide4.shapes.add_textbox(Inches(7.0), Inches(1.6), Inches(5.5), Inches(0.35))
    fr_h.text_frame.paragraphs[0].text = "🛡 Risk & Mitigation Strategy"
    fr_h.text_frame.paragraphs[0].font.size = Pt(13)
    fr_h.text_frame.paragraphs[0].font.bold = True
    fr_h.text_frame.paragraphs[0].font.color.rgb = COLOR_BLUE

    fr_i1 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(2.1), Inches(5.3), Inches(2.0))
    fr_i1.fill.solid()
    fr_i1.fill.fore_color.rgb = RGBColor(255, 241, 242)
    fr_i1.line.color.rgb = RGBColor(254, 205, 211)
    tf_fri1 = fr_i1.text_frame
    p_fri1 = tf_fri1.paragraphs[0]
    p_fri1.text = "RISK: High Graph Scale Complexity"
    p_fri1.font.size = Pt(10.5)
    p_fri1.font.bold = True
    p_fri1.font.color.rgb = RGBColor(225, 29, 72)
    p_fri1_d = tf_fri1.add_paragraph()
    p_fri1_d.text = "Mitigation: Subgraph sampling & GPU sharding."
    p_fri1_d.font.size = Pt(9.5)
    p_fri1_d.font.color.rgb = COLOR_DARK

    fr_i2 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(4.3), Inches(5.3), Inches(2.0))
    fr_i2.fill.solid()
    fr_i2.fill.fore_color.rgb = RGBColor(255, 241, 242)
    fr_i2.line.color.rgb = RGBColor(254, 205, 211)
    tf_fri2 = fr_i2.text_frame
    p_fri2 = tf_fri2.paragraphs[0]
    p_fri2.text = "RISK: Data Security & Access Leakage"
    p_fri2.font.size = Pt(10.5)
    p_fri2.font.bold = True
    p_fri2.font.color.rgb = RGBColor(225, 29, 72)
    p_fri2_d = tf_fri2.add_paragraph()
    p_fri2_d.text = "Mitigation: Role-Based Access (RBAC) & ZK-Proofs."
    p_fri2_d.font.size = Pt(9.5)
    p_fri2_d.font.color.rgb = COLOR_DARK

    # =========================================================================
    # SLIDE 5: IMPACT AND BENEFITS
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_base_elements(slide5, "SLIDE 05")

    s5_title = slide5.shapes.add_textbox(Inches(0.6), Inches(0.85), Inches(12.0), Inches(0.4))
    s5_title.text_frame.paragraphs[0].text = "IMPACT AND BENEFITS"
    s5_title.text_frame.paragraphs[0].font.size = Pt(20)
    s5_title.text_frame.paragraphs[0].font.bold = True
    s5_title.text_frame.paragraphs[0].font.color.rgb = COLOR_DARK

    impact_cards = [
        ("85%", "Faster Analysis", "Reduces link discovery time from weeks to minutes.", COLOR_BLUE),
        ("100%", "Evidence Integrity", "Blockchain hashing guarantees judicial validity.", COLOR_GREEN),
        ("360°", "Syndicate View", "Unified view across CDR, CCTNS & crypto logs.", COLOR_PURPLE),
        ("Zero", "Manual Silos", "Automated cross-state gang link identification.", COLOR_ORANGE)
    ]
    card_w5 = Inches(2.9)
    for idx5, (stat, header, desc, col) in enumerate(impact_cards):
        x5 = Inches(0.6) + idx5 * Inches(3.08)
        sc5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x5, Inches(1.8), card_w5, Inches(4.9))
        sc5.fill.solid()
        sc5.fill.fore_color.rgb = COLOR_WHITE
        sc5.line.color.rgb = COLOR_CARD_BORDER

        ts5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x5, Inches(1.8), card_w5, Inches(0.08))
        ts5.fill.solid()
        ts5.fill.fore_color.rgb = col
        ts5.line.fill.background()

        sb5 = slide5.shapes.add_textbox(x5 + Inches(0.1), Inches(2.3), card_w5 - Inches(0.2), Inches(1.1))
        tf_sb5 = sb5.text_frame
        p_sb5 = tf_sb5.paragraphs[0]
        p_sb5.text = stat
        p_sb5.font.size = Pt(40)
        p_sb5.font.bold = True
        p_sb5.font.color.rgb = col
        p_sb5.alignment = PP_ALIGN.CENTER

        sh5 = slide5.shapes.add_textbox(x5 + Inches(0.1), Inches(3.6), card_w5 - Inches(0.2), Inches(0.6))
        tf_sh5 = sh5.text_frame
        p_sh5 = tf_sh5.paragraphs[0]
        p_sh5.text = header
        p_sh5.font.size = Pt(13)
        p_sh5.font.bold = True
        p_sh5.font.color.rgb = COLOR_DARK
        p_sh5.alignment = PP_ALIGN.CENTER

        sd5 = slide5.shapes.add_textbox(x5 + Inches(0.15), Inches(4.4), card_w5 - Inches(0.3), Inches(2.0))
        tf_sd5 = sd5.text_frame
        tf_sd5.word_wrap = True
        p_sd5 = tf_sd5.paragraphs[0]
        p_sd5.text = desc
        p_sd5.font.size = Pt(10)
        p_sd5.font.color.rgb = COLOR_MUTED
        p_sd5.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 6: RESEARCH AND REFERENCES (With 3D Cyber Shield Visual)
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_base_elements(slide6, "SLIDE 06")

    s6_title = slide6.shapes.add_textbox(Inches(0.6), Inches(0.85), Inches(12.0), Inches(0.4))
    s6_title.text_frame.paragraphs[0].text = "RESEARCH AND REFERENCES"
    s6_title.text_frame.paragraphs[0].font.size = Pt(20)
    s6_title.text_frame.paragraphs[0].font.bold = True
    s6_title.text_frame.paragraphs[0].font.color.rgb = COLOR_DARK

    # Left Container
    r_left = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.4), Inches(5.9), Inches(5.3))
    r_left.fill.solid()
    r_left.fill.fore_color.rgb = COLOR_WHITE
    r_left.line.color.rgb = COLOR_CARD_BORDER
    rl_h = slide6.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(5.5), Inches(0.35))
    rl_h.text_frame.paragraphs[0].text = "🎓 Academic Literature & AI Benchmarks"
    rl_h.text_frame.paragraphs[0].font.size = Pt(13)
    rl_h.text_frame.paragraphs[0].font.bold = True
    rl_h.text_frame.paragraphs[0].font.color.rgb = COLOR_BLUE

    rl_1 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(2.1), Inches(5.3), Inches(2.0))
    rl_1.fill.solid()
    rl_1.fill.fore_color.rgb = RGBColor(248, 250, 252)
    rl_1.line.color.rgb = COLOR_CARD_BORDER
    s_rl1 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(2.1), Inches(0.08), Inches(2.0))
    s_rl1.fill.solid()
    s_rl1.fill.fore_color.rgb = COLOR_BLUE
    s_rl1.line.fill.background()
    tf_rl1 = rl_1.text_frame
    tf_rl1.margin_left = Inches(0.2)
    p_rl1 = tf_rl1.paragraphs[0]
    p_rl1.text = "Heterogeneous Graph Neural Networks (IEEE 2025)"
    p_rl1.font.size = Pt(11)
    p_rl1.font.bold = True
    p_rl1.font.color.rgb = COLOR_BLUE
    p_rl1_d = tf_rl1.add_paragraph()
    p_rl1_d.text = "Relational learning for complex fraud & criminal link detection."
    p_rl1_d.font.size = Pt(9.5)
    p_rl1_d.font.color.rgb = COLOR_MUTED

    rl_2 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(4.3), Inches(5.3), Inches(2.0))
    rl_2.fill.solid()
    rl_2.fill.fore_color.rgb = RGBColor(248, 250, 252)
    rl_2.line.color.rgb = COLOR_CARD_BORDER
    s_rl2 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(4.3), Inches(0.08), Inches(2.0))
    s_rl2.fill.solid()
    s_rl2.fill.fore_color.rgb = COLOR_BLUE
    s_rl2.line.fill.background()
    tf_rl2 = rl_2.text_frame
    tf_rl2.margin_left = Inches(0.2)
    p_rl2 = tf_rl2.paragraphs[0]
    p_rl2.text = "Louvain Community Centrality Models"
    p_rl2.font.size = Pt(11)
    p_rl2.font.bold = True
    p_rl2.font.color.rgb = COLOR_BLUE
    p_rl2_d = tf_rl2.add_paragraph()
    p_rl2_d.text = "Algorithmic discovery of sleeper cells in dense networks."
    p_rl2_d.font.size = Pt(9.5)
    p_rl2_d.font.color.rgb = COLOR_MUTED

    # Right Container
    r_right = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.4), Inches(5.9), Inches(5.3))
    r_right.fill.solid()
    r_right.fill.fore_color.rgb = COLOR_WHITE
    r_right.line.color.rgb = COLOR_CARD_BORDER
    rr_h = slide6.shapes.add_textbox(Inches(7.0), Inches(1.6), Inches(5.5), Inches(0.35))
    rr_h.text_frame.paragraphs[0].text = "🏛 Government Standards & Guidelines"
    rr_h.text_frame.paragraphs[0].font.size = Pt(13)
    rr_h.text_frame.paragraphs[0].font.bold = True
    rr_h.text_frame.paragraphs[0].font.color.rgb = COLOR_GREEN

    rr_1 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(2.1), Inches(5.3), Inches(2.0))
    rr_1.fill.solid()
    rr_1.fill.fore_color.rgb = RGBColor(248, 250, 252)
    rr_1.line.color.rgb = COLOR_CARD_BORDER
    s_rr1 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(2.1), Inches(0.08), Inches(2.0))
    s_rr1.fill.solid()
    s_rr1.fill.fore_color.rgb = COLOR_GREEN
    s_rr1.line.fill.background()
    tf_rr1 = rr_1.text_frame
    tf_rr1.margin_left = Inches(0.2)
    p_rr1 = tf_rr1.paragraphs[0]
    p_rr1.text = "MHA Interoperable Criminal Justice System (ICJS)"
    p_rr1.font.size = Pt(11)
    p_rr1.font.bold = True
    p_rr1.font.color.rgb = COLOR_GREEN
    p_rr1_d = tf_rr1.add_paragraph()
    p_rr1_d.text = "CCTNS data exchange protocols & metadata standards."
    p_rr1_d.font.size = Pt(9.5)
    p_rr1_d.font.color.rgb = COLOR_MUTED

    rr_2 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(4.3), Inches(5.3), Inches(2.0))
    rr_2.fill.solid()
    rr_2.fill.fore_color.rgb = RGBColor(248, 250, 252)
    rr_2.line.color.rgb = COLOR_CARD_BORDER
    s_rr2 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(4.3), Inches(0.08), Inches(2.0))
    s_rr2.fill.solid()
    s_rr2.fill.fore_color.rgb = COLOR_GREEN
    s_rr2.line.fill.background()
    tf_rr2 = rr_2.text_frame
    tf_rr2.margin_left = Inches(0.2)
    p_rr2 = tf_rr2.paragraphs[0]
    p_rr2.text = "Hyperledger Fabric Cryptographic Standards"
    p_rr2.font.size = Pt(11)
    p_rr2.font.bold = True
    p_rr2.font.color.rgb = COLOR_GREEN
    p_rr2_d = tf_rr2.add_paragraph()
    p_rr2_d.text = "NIST specifications for immutable chain-of-custody."
    p_rr2_d.font.size = Pt(9.5)
    p_rr2_d.font.color.rgb = COLOR_MUTED

    prs.save(output_path)
    print(f"[SUCCESS] Pixel-Perfect 3D Deck generated at: {output_path}")

if __name__ == "__main__":
    out1 = r"c:\Users\maury\OneDrive\Desktop\SIH26189_AI_Criminal_Network_Analysis_System.pptx"
    out2 = r"c:\Users\maury\OneDrive\Desktop\KavachNet-AI\docs\SIH26189_AI_Criminal_Network_Analysis_System.pptx"
    build_perfect_sih_deck(out1)
    build_perfect_sih_deck(out2)
