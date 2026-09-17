import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_sih_presentation(output_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    
    blank_layout = prs.slide_layouts[6]

    # Exact Color Palette matching SIH template
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

    def add_header_and_footer(slide, slide_num_text=""):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_BG
        bg.line.fill.background()

        # Top Header Bar
        txBox = slide.shapes.add_textbox(Inches(0.6), Inches(0.4), Inches(8.0), Inches(0.5))
        tf = txBox.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = "SMART INDIA HACKATHON 2026"
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = COLOR_DARK

        if slide_num_text:
            badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(11.8), Inches(0.35), Inches(1.0), Inches(0.35))
            badge.fill.solid()
            badge.fill.fore_color.rgb = RGBColor(238, 242, 255)
            badge.line.color.rgb = RGBColor(199, 210, 254)
            tf_b = badge.text_frame
            p_b = tf_b.paragraphs[0]
            p_b.text = slide_num_text
            p_b.font.size = Pt(10)
            p_b.font.bold = True
            p_b.font.color.rgb = COLOR_BLUE
            p_b.alignment = PP_ALIGN.CENTER
        else:
            badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(11.2), Inches(0.35), Inches(1.6), Inches(0.35))
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
    # SLIDE 1: TITLE SLIDE (Exact matching uploaded template)
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    add_header_and_footer(slide1, "")

    # Left Main Title Card
    card1 = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.1), Inches(7.8), Inches(5.6))
    card1.fill.solid()
    card1.fill.fore_color.rgb = COLOR_WHITE
    card1.line.color.rgb = COLOR_CARD_BORDER

    # Problem Statement ID Badge
    ps_badge = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(3.2), Inches(3.0), Inches(0.35))
    ps_badge.fill.solid()
    ps_badge.fill.fore_color.rgb = RGBColor(239, 246, 255)
    ps_badge.line.color.rgb = RGBColor(191, 219, 254)
    tf_ps = ps_badge.text_frame
    p_ps = tf_ps.paragraphs[0]
    p_ps.text = "PROBLEM STATEMENT ID: SIH26189/500"
    p_ps.font.size = Pt(9)
    p_ps.font.bold = True
    p_ps.font.color.rgb = COLOR_BLUE

    # Title
    t_box = slide1.shapes.add_textbox(Inches(0.9), Inches(3.7), Inches(7.2), Inches(2.6))
    tf_t = t_box.text_frame
    tf_t.word_wrap = True
    p1 = tf_t.paragraphs[0]
    p1.text = "AI-Powered Criminal Network\nAnalysis System"
    p1.font.size = Pt(26)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_DARK
    p1.space_after = Pt(10)

    p2 = tf_t.add_paragraph()
    p2.text = "Heterogeneous Graph Intelligence & Link Analysis for Syndicate Discovery"
    p2.font.size = Pt(13)
    p2.font.color.rgb = COLOR_MUTED

    # Right Metadata Cards
    # 1. Ministry Card
    m_card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.7), Inches(1.1), Inches(4.0), Inches(1.6))
    m_card.fill.solid()
    m_card.fill.fore_color.rgb = COLOR_WHITE
    m_card.line.color.rgb = COLOR_CARD_BORDER
    s1 = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.7), Inches(1.1), Inches(0.08), Inches(1.6))
    s1.fill.solid()
    s1.fill.fore_color.rgb = COLOR_AMBER
    s1.line.fill.background()
    tf_m = m_card.text_frame
    tf_m.margin_left = Inches(0.2)
    p_m1 = tf_m.paragraphs[0]
    p_m1.text = "ORGANIZATION / MINISTRY"
    p_m1.font.size = Pt(9)
    p_m1.font.bold = True
    p_m1.font.color.rgb = COLOR_MUTED
    p_m2 = tf_m.add_paragraph()
    p_m2.text = "Ministry of Home Affairs (MHA)"
    p_m2.font.size = Pt(13)
    p_m2.font.bold = True
    p_m2.font.color.rgb = COLOR_DARK

    # 2. Theme Card
    th_card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.7), Inches(3.0), Inches(4.0), Inches(1.6))
    th_card.fill.solid()
    th_card.fill.fore_color.rgb = COLOR_WHITE
    th_card.line.color.rgb = COLOR_CARD_BORDER
    s2 = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.7), Inches(3.0), Inches(0.08), Inches(1.6))
    s2.fill.solid()
    s2.fill.fore_color.rgb = COLOR_BLUE
    s2.line.fill.background()
    tf_th = th_card.text_frame
    tf_th.margin_left = Inches(0.2)
    p_th1 = tf_th.paragraphs[0]
    p_th1.text = "THEME"
    p_th1.font.size = Pt(9)
    p_th1.font.bold = True
    p_th1.font.color.rgb = COLOR_MUTED
    p_th2 = tf_th.add_paragraph()
    p_th2.text = "Blockchain & Cybersecurity"
    p_th2.font.size = Pt(13)
    p_th2.font.bold = True
    p_th2.font.color.rgb = COLOR_BLUE

    # 3. Team Card
    tm_card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.7), Inches(4.9), Inches(4.0), Inches(1.6))
    tm_card.fill.solid()
    tm_card.fill.fore_color.rgb = COLOR_WHITE
    tm_card.line.color.rgb = COLOR_CARD_BORDER
    s3 = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.7), Inches(4.9), Inches(0.08), Inches(1.6))
    s3.fill.solid()
    s3.fill.fore_color.rgb = COLOR_GREEN
    s3.line.fill.background()
    tf_tm = tm_card.text_frame
    tf_tm.margin_left = Inches(0.2)
    p_tm1 = tf_tm.paragraphs[0]
    p_tm1.text = "TEAM NAME"
    p_tm1.font.size = Pt(9)
    p_tm1.font.bold = True
    p_tm1.font.color.rgb = COLOR_MUTED
    p_tm2 = tf_tm.add_paragraph()
    p_tm2.text = "Team Nexora"
    p_tm2.font.size = Pt(13)
    p_tm2.font.bold = True
    p_tm2.font.color.rgb = COLOR_GREEN

    # =========================================================================
    # SLIDE 2: PROPOSED SOLUTION
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_header_and_footer(slide2, "SLIDE 02")

    s2_title = slide2.shapes.add_textbox(Inches(0.6), Inches(0.9), Inches(12.0), Inches(0.5))
    tf_s2 = s2_title.text_frame
    p_s2 = tf_s2.paragraphs[0]
    p_s2.text = "PROPOSED SOLUTION"
    p_s2.font.size = Pt(20)
    p_s2.font.bold = True
    p_s2.font.color.rgb = COLOR_DARK

    d_card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.5), Inches(12.133), Inches(3.4))
    d_card.fill.solid()
    d_card.fill.fore_color.rgb = COLOR_WHITE
    d_card.line.color.rgb = COLOR_CARD_BORDER

    d_label = slide2.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(10.0), Inches(0.3))
    tf_dl = d_label.text_frame
    p_dl = tf_dl.paragraphs[0]
    p_dl.text = "❖ KNOWLEDGE GRAPH & AI LINK ANALYSIS CONCEPT DIAGRAM"
    p_dl.font.size = Pt(10)
    p_dl.font.bold = True
    p_dl.font.color.rgb = COLOR_PRIMARY

    # Inputs Block (Left)
    in_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(2.0), Inches(2.6), Inches(2.6))
    in_box.fill.solid()
    in_box.fill.fore_color.rgb = RGBColor(248, 250, 252)
    in_box.line.color.rgb = COLOR_CARD_BORDER
    tf_in = in_box.text_frame
    p_in = tf_in.paragraphs[0]
    p_in.text = "📞 CDR & IP Logs\n\n📄 CCTNS Records\n\n💳 Crypto Wallets"
    p_in.font.size = Pt(11)
    p_in.font.bold = True
    p_in.font.color.rgb = COLOR_DARK

    # Arrow 1
    a1 = slide2.shapes.add_textbox(Inches(3.6), Inches(3.0), Inches(0.6), Inches(0.5))
    a1.text_frame.paragraphs[0].text = "➔"
    a1.text_frame.paragraphs[0].font.size = Pt(20)
    a1.text_frame.paragraphs[0].font.color.rgb = COLOR_BLUE

    # Core Engine Block (Center)
    core_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.3), Inches(2.0), Inches(3.8), Inches(2.6))
    core_box.fill.solid()
    core_box.fill.fore_color.rgb = RGBColor(239, 246, 255)
    core_box.line.color.rgb = COLOR_BLUE
    tf_core = core_box.text_frame
    p_c1 = tf_core.paragraphs[0]
    p_c1.text = "Heterogeneous Graph AI\n"
    p_c1.font.size = Pt(13)
    p_c1.font.bold = True
    p_c1.font.color.rgb = COLOR_BLUE
    p_c2 = tf_core.add_paragraph()
    p_c2.text = "Neo4j + Temporal GNN Embeddings\n\n• Betweenness & PageRank Centrality\n• Louvain Sub-Gang Detection\n• Adamic-Adar Covert Link Prediction"
    p_c2.font.size = Pt(9.5)
    p_c2.font.color.rgb = COLOR_DARK

    # Arrow 2
    a2 = slide2.shapes.add_textbox(Inches(8.2), Inches(3.0), Inches(0.6), Inches(0.5))
    a2.text_frame.paragraphs[0].text = "➔"
    a2.text_frame.paragraphs[0].font.size = Pt(20)
    a2.text_frame.paragraphs[0].font.color.rgb = COLOR_BLUE

    # Output 1
    out1 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.9), Inches(2.0), Inches(3.6), Inches(1.2))
    out1.fill.solid()
    out1.fill.fore_color.rgb = RGBColor(236, 253, 245)
    out1.line.color.rgb = COLOR_GREEN
    tf_o1 = out1.text_frame
    p_o1 = tf_o1.paragraphs[0]
    p_o1.text = "👑 Syndicate Discovery\nUncovers hidden kingpins & cross-state sleeper cells"
    p_o1.font.size = Pt(9.5)
    p_o1.font.color.rgb = RGBColor(6, 95, 70)

    # Output 2
    out2 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.9), Inches(3.4), Inches(3.6), Inches(1.2))
    out2.fill.solid()
    out2.fill.fore_color.rgb = RGBColor(255, 247, 237)
    out2.line.color.rgb = COLOR_ORANGE
    tf_o2 = out2.text_frame
    p_o2 = tf_o2.paragraphs[0]
    p_o2.text = "🔒 Blockchain Audit Log\nTamper-proof evidence trail for court admissibility"
    p_o2.font.size = Pt(9.5)
    p_o2.font.color.rgb = RGBColor(154, 52, 18)

    # 3 Bottom Pillars
    p_widths = Inches(3.85)
    pillars = [
        ("✓ Multi-Source Ingestion", "Automated ingestion of police, telco, and crypto feeds.", COLOR_PRIMARY),
        ("✓ Zero Manual Silos", "Replaces slow manual cross-referencing with instant AI links.", COLOR_BLUE),
        ("✓ Temporal Link Prediction", "Predicts emerging criminal operations dynamically.", COLOR_PURPLE)
    ]
    for idx, (p_title, p_desc, p_col) in enumerate(pillars):
        x = Inches(0.6) + idx * Inches(4.14)
        p_card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(5.1), p_widths, Inches(1.6))
        p_card.fill.solid()
        p_card.fill.fore_color.rgb = COLOR_WHITE
        p_card.line.color.rgb = COLOR_CARD_BORDER
        tb = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(5.1), p_widths, Inches(0.06))
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
    add_header_and_footer(slide3, "SLIDE 03")

    s3_title = slide3.shapes.add_textbox(Inches(0.6), Inches(0.9), Inches(12.0), Inches(0.5))
    tf_s3 = s3_title.text_frame
    p_s3 = tf_s3.paragraphs[0]
    p_s3.text = "TECHNICAL APPROACH"
    p_s3.font.size = Pt(20)
    p_s3.font.bold = True
    p_s3.font.color.rgb = COLOR_DARK

    badges = [
        ("⚙ Python / PyTorch Geometric", COLOR_DARK),
        ("🗄 Neo4j Graph DB", COLOR_PRIMARY),
        ("⛓ Hyperledger Fabric", COLOR_GREEN),
        ("💻 FastAPI & React.js", COLOR_PURPLE)
    ]
    for b_idx, (b_text, b_color) in enumerate(badges):
        bx = Inches(0.6) + b_idx * Inches(3.08)
        badge_s = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, Inches(1.5), Inches(2.95), Inches(0.4))
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
    card_w = Inches(2.9)
    for s_idx, (st_num, st_title, st_desc, st_col) in enumerate(steps):
        sx = Inches(0.6) + s_idx * Inches(3.08)
        sc = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx, Inches(2.1), card_w, Inches(4.6))
        sc.fill.solid()
        sc.fill.fore_color.rgb = COLOR_WHITE
        sc.line.color.rgb = COLOR_CARD_BORDER
        if s_idx == 3:
            sc.line.color.rgb = COLOR_BLUE
            sc.line.width = Pt(1.5)

        tag = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx + Inches(0.2), Inches(2.4), Inches(1.0), Inches(0.3))
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

        st_box = slide3.shapes.add_textbox(sx + Inches(0.15), Inches(2.9), card_w - Inches(0.3), Inches(0.8))
        tf_st = st_box.text_frame
        tf_st.word_wrap = True
        p_st = tf_st.paragraphs[0]
        p_st.text = st_title
        p_st.font.size = Pt(12)
        p_st.font.bold = True
        p_st.font.color.rgb = COLOR_DARK

        sd_box = slide3.shapes.add_textbox(sx + Inches(0.15), Inches(3.8), card_w - Inches(0.3), Inches(2.6))
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
    add_header_and_footer(slide4, "SLIDE 04")

    s4_title = slide4.shapes.add_textbox(Inches(0.6), Inches(0.9), Inches(12.0), Inches(0.5))
    tf_s4 = s4_title.text_frame
    p_s4 = tf_s4.paragraphs[0]
    p_s4.text = "FEASIBILITY AND VIABILITY"
    p_s4.font.size = Pt(20)
    p_s4.font.bold = True
    p_s4.font.color.rgb = COLOR_DARK

    f_left = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.6), Inches(5.9), Inches(5.1))
    f_left.fill.solid()
    f_left.fill.fore_color.rgb = COLOR_WHITE
    f_left.line.color.rgb = COLOR_CARD_BORDER
    fl_h = slide4.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(5.5), Inches(0.4))
    fl_h.text_frame.paragraphs[0].text = "✔ Feasibility Pillars"
    fl_h.text_frame.paragraphs[0].font.size = Pt(13)
    fl_h.text_frame.paragraphs[0].font.bold = True
    fl_h.text_frame.paragraphs[0].font.color.rgb = COLOR_GREEN

    fl_i1 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(2.4), Inches(5.3), Inches(1.8))
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

    fl_i2 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(4.5), Inches(5.3), Inches(1.8))
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

    f_right = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.6), Inches(5.9), Inches(5.1))
    f_right.fill.solid()
    f_right.fill.fore_color.rgb = COLOR_WHITE
    f_right.line.color.rgb = COLOR_CARD_BORDER
    fr_h = slide4.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.5), Inches(0.4))
    fr_h.text_frame.paragraphs[0].text = "🛡 Risk & Mitigation Strategy"
    fr_h.text_frame.paragraphs[0].font.size = Pt(13)
    fr_h.text_frame.paragraphs[0].font.bold = True
    fr_h.text_frame.paragraphs[0].font.color.rgb = COLOR_BLUE

    fr_i1 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(2.4), Inches(5.3), Inches(1.8))
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

    fr_i2 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(4.5), Inches(5.3), Inches(1.8))
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
    add_header_and_footer(slide5, "SLIDE 05")

    s5_title = slide5.shapes.add_textbox(Inches(0.6), Inches(0.9), Inches(12.0), Inches(0.5))
    tf_s5 = s5_title.text_frame
    p_s5 = tf_s5.paragraphs[0]
    p_s5.text = "IMPACT AND BENEFITS"
    p_s5.font.size = Pt(20)
    p_s5.font.bold = True
    p_s5.font.color.rgb = COLOR_DARK

    impact_cards = [
        ("85%", "Faster Analysis", "Reduces link discovery time from weeks to minutes.", COLOR_BLUE),
        ("100%", "Evidence Integrity", "Blockchain hashing guarantees judicial validity.", COLOR_GREEN),
        ("360°", "Syndicate View", "Unified view across CDR, CCTNS & crypto logs.", COLOR_PURPLE),
        ("Zero", "Manual Silos", "Automated cross-state gang link identification.", COLOR_ORANGE)
    ]
    card_w5 = Inches(2.9)
    for idx5, (stat, header, desc, col) in enumerate(impact_cards):
        x5 = Inches(0.6) + idx5 * Inches(3.08)
        sc5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x5, Inches(2.1), card_w5, Inches(4.3))
        sc5.fill.solid()
        sc5.fill.fore_color.rgb = COLOR_WHITE
        sc5.line.color.rgb = COLOR_CARD_BORDER

        ts5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x5, Inches(2.1), card_w5, Inches(0.08))
        ts5.fill.solid()
        ts5.fill.fore_color.rgb = col
        ts5.line.fill.background()

        sb5 = slide5.shapes.add_textbox(x5 + Inches(0.1), Inches(2.5), card_w5 - Inches(0.2), Inches(1.1))
        tf_sb5 = sb5.text_frame
        p_sb5 = tf_sb5.paragraphs[0]
        p_sb5.text = stat
        p_sb5.font.size = Pt(36)
        p_sb5.font.bold = True
        p_sb5.font.color.rgb = col
        p_sb5.alignment = PP_ALIGN.CENTER

        sh5 = slide5.shapes.add_textbox(x5 + Inches(0.1), Inches(3.7), card_w5 - Inches(0.2), Inches(0.6))
        tf_sh5 = sh5.text_frame
        p_sh5 = tf_sh5.paragraphs[0]
        p_sh5.text = header
        p_sh5.font.size = Pt(13)
        p_sh5.font.bold = True
        p_sh5.font.color.rgb = COLOR_DARK
        p_sh5.alignment = PP_ALIGN.CENTER

        sd5 = slide5.shapes.add_textbox(x5 + Inches(0.15), Inches(4.4), card_w5 - Inches(0.3), Inches(1.8))
        tf_sd5 = sd5.text_frame
        tf_sd5.word_wrap = True
        p_sd5 = tf_sd5.paragraphs[0]
        p_sd5.text = desc
        p_sd5.font.size = Pt(10)
        p_sd5.font.color.rgb = COLOR_MUTED
        p_sd5.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 6: RESEARCH AND REFERENCES
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_header_and_footer(slide6, "SLIDE 06")

    s6_title = slide6.shapes.add_textbox(Inches(0.6), Inches(0.9), Inches(12.0), Inches(0.5))
    tf_s6 = s6_title.text_frame
    p_s6 = tf_s6.paragraphs[0]
    p_s6.text = "RESEARCH AND REFERENCES"
    p_s6.font.size = Pt(20)
    p_s6.font.bold = True
    p_s6.font.color.rgb = COLOR_DARK

    r_left = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.6), Inches(5.9), Inches(5.1))
    r_left.fill.solid()
    r_left.fill.fore_color.rgb = COLOR_WHITE
    r_left.line.color.rgb = COLOR_CARD_BORDER
    rl_h = slide6.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(5.5), Inches(0.4))
    rl_h.text_frame.paragraphs[0].text = "🎓 Academic Literature & AI Benchmarks"
    rl_h.text_frame.paragraphs[0].font.size = Pt(13)
    rl_h.text_frame.paragraphs[0].font.bold = True
    rl_h.text_frame.paragraphs[0].font.color.rgb = COLOR_BLUE

    rl_1 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(2.4), Inches(5.3), Inches(1.8))
    rl_1.fill.solid()
    rl_1.fill.fore_color.rgb = RGBColor(248, 250, 252)
    rl_1.line.color.rgb = COLOR_CARD_BORDER
    s_rl1 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(2.4), Inches(0.08), Inches(1.8))
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

    rl_2 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(4.5), Inches(5.3), Inches(1.8))
    rl_2.fill.solid()
    rl_2.fill.fore_color.rgb = RGBColor(248, 250, 252)
    rl_2.line.color.rgb = COLOR_CARD_BORDER
    s_rl2 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(4.5), Inches(0.08), Inches(1.8))
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

    r_right = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.6), Inches(5.9), Inches(5.1))
    r_right.fill.solid()
    r_right.fill.fore_color.rgb = COLOR_WHITE
    r_right.line.color.rgb = COLOR_CARD_BORDER
    rr_h = slide6.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.5), Inches(0.4))
    rr_h.text_frame.paragraphs[0].text = "🏛 Government Standards & Guidelines"
    rr_h.text_frame.paragraphs[0].font.size = Pt(13)
    rr_h.text_frame.paragraphs[0].font.bold = True
    rr_h.text_frame.paragraphs[0].font.color.rgb = COLOR_GREEN

    rr_1 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(2.4), Inches(5.3), Inches(1.8))
    rr_1.fill.solid()
    rr_1.fill.fore_color.rgb = RGBColor(248, 250, 252)
    rr_1.line.color.rgb = COLOR_CARD_BORDER
    s_rr1 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(2.4), Inches(0.08), Inches(1.8))
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

    rr_2 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(4.5), Inches(5.3), Inches(1.8))
    rr_2.fill.solid()
    rr_2.fill.fore_color.rgb = RGBColor(248, 250, 252)
    rr_2.line.color.rgb = COLOR_CARD_BORDER
    s_rr2 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(4.5), Inches(0.08), Inches(1.8))
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
    print(f"[SUCCESS] SIH 2026 Presentation generated successfully at: {output_path}")

if __name__ == "__main__":
    out_file1 = r"c:\Users\maury\OneDrive\Desktop\SIH26189_AI_Criminal_Network_Analysis_System.pptx"
    out_file2 = r"c:\Users\maury\OneDrive\Desktop\KavachNet-AI\docs\SIH26189_AI_Criminal_Network_Analysis_System.pptx"
    create_sih_presentation(out_file1)
    create_sih_presentation(out_file2)
