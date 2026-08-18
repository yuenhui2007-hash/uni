# Monash B2026 — Elective: Business Analytics & Econometrics

## Unit E1: ETC2440/ETC2410 — Business Analytics & Econometrics

### Learning Outcomes

#### LO1: Apply appropriate mathematical and statistical techniques to the analysis of social, financial, business and economic data, subsequently drawing out insightful inferences for the purposes of knowledge advancement and/or policy making

**Definition — Business Analytics & Econometrics:**
A combined discipline that applies rigorous mathematical, statistical, and computational methods to analyse business and economic data. While **business analytics** focuses on data-driven decision-making within organisations (descriptive, predictive, and prescriptive), **econometrics** provides the formal statistical framework for testing economic theories, estimating causal relationships, and evaluating policy impacts using real-world data.

**The Analytical Spectrum:**

| Stage | Question | Business Analytics Focus | Econometrics Focus |
|-------|----------|------------------------|-------------------|
| **Descriptive** | What happened? | Dashboards, KPIs, visualisation | Summary statistics, data description |
| **Diagnostic** | Why did it happen? | Root-cause analysis, drill-downs | Hypothesis testing, model diagnostics |
| **Predictive** | What will happen? | ML models, forecasting | Regression, time-series models |
| **Prescriptive** | What should we do? | Optimisation, simulation | Policy simulation, causal inference |

---

### Chapter 1: Foundations of Data Analysis

**Definition — Structured vs Unstructured Data:**
- **Structured:** Organised in rows/columns (spreadsheets, SQL databases, transaction records)
- **Unstructured:** Text, images, audio, social media posts, emails
- **Semi-structured:** JSON, XML, log files with partial organisation

**The Data Analysis Pipeline:**
1. **Problem formulation** → Define the business/economic question
2. **Data collection** → Gather relevant data from internal/external sources
3. **Data cleaning** → Handle missing values, outliers, inconsistencies
4. **Exploratory analysis** → Visualise patterns, correlations, distributions
5. **Modelling** → Apply statistical/econometric models
6. **Validation** → Test model accuracy, check assumptions
7. **Inference** → Draw conclusions, test hypotheses
8. **Communication** → Present findings with visualisations
9. **Implementation** → Deploy insights into policy or operations

**Data Quality Dimensions:**
- **Accuracy:** Correct values
- **Completeness:** Minimal missing data
- **Consistency:** Same format across sources
- **Timeliness:** Current enough for decisions
- **Uniqueness:** No duplicate records

---

### Chapter 2: Descriptive Statistics

**Measures of Central Tendency:**

| Measure | Formula | When to Use |
|---------|---------|-------------|
| **Mean** | $\bar{x} = \frac{\sum x_i}{n}$ | Symmetric data, no extreme outliers |
| **Median** | Middle value when sorted | Skewed data, presence of outliers |
| **Mode** | Most frequent value | Categorical data, identifying peaks |

**Measures of Dispersion:**

| Measure | Formula | Interpretation |
|---------|---------|----------------|
| **Range** | Max − Min | Total spread; sensitive to outliers |
| **Variance** | $s^2 = \frac{\sum(x_i - \bar{x})^2}{n-1}$ | Average squared deviation |
| **Std Dev** | $s = \sqrt{s^2}$ | Typical distance from mean |
| **IQR** | Q3 − Q1 | Spread of middle 50%; robust to outliers |
| **CV** | $\frac{s}{\bar{x}} \times 100\%$ | Relative dispersion |

**Worked Example 1: Customer Spend Analysis**
> A retailer records daily customer spending ($): 45, 52, 48, 120, 50, 47, 51, 49, 500, 53
> 
> **Mean:** $(45+52+48+120+50+47+51+49+500+53)/10 = 101.5$
> 
> **Median (sorted):** 45, 47, 48, 49, **50, 51**, 52, 53, 120, 500 → $(50+51)/2 = 50.5$
> 
> **Insight:** Mean ($101.50) is skewed by outliers ($120, $500). Median ($50.50) better represents typical spend.

---

### Chapter 3: Data Visualisation for Business & Policy

**Choosing the Right Chart:**

| Purpose | Chart Type | When to Use |
|---------|-----------|-------------|
| Compare categories | Bar chart | Few categories, emphasis on magnitude |
| Show trends over time | Line chart | Time-series data, continuous x-axis |
| Show composition | Pie / Donut | Parts of a whole (max 5-7 segments) |
| Show distribution | Histogram | Frequency of continuous variable |
| Show relationship | Scatter plot | Correlation between two variables |
| Show hierarchy | Tree map | Nested categories with size encoding |

**Visualisation Best Practices:**
- Always label axes with units
- Use consistent colour schemes
- Start bar charts at zero
- Avoid 3D effects
- Use annotations to highlight key insights
- One message per chart

---

### Chapter 4: Regression Analysis — The Core Tool

**Definition — Simple Linear Regression:**
A statistical method that models the relationship between a dependent variable $y$ and one independent variable $x$:
$$y = \beta_0 + \beta_1 x + \varepsilon$$

Where:
- $\beta_0$ = intercept
- $\beta_1$ = slope (change in $y$ for one-unit change in $x$)
- $\varepsilon$ = error term

**Ordinary Least Squares (OLS):**
Estimates $\beta_0$ and $\beta_1$ by minimising the sum of squared residuals:
$$\min \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$

**Key Formulas:**
$$\hat{\beta}_1 = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sum(x_i - \bar{x})^2} = \frac{\text{Cov}(x,y)}{\text{Var}(x)}$$

$$\hat{\beta}_0 = \bar{y} - \hat{\beta}_1 \bar{x}$$

**Model Evaluation Metrics:**

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| **R²** | $1 - \frac{SS_{res}}{SS_{tot}}$ | Proportion of variance explained (0 to 1) |
| **RMSE** | $\sqrt{\frac{\sum(y_i - \hat{y}_i)^2}{n}}$ | Typical prediction error |
| **MAE** | $\frac{\sum|y_i - \hat{y}_i|}{n}$ | Average absolute error |

**Worked Example 2: Advertising vs Sales**
> Given monthly data ($k spent on ads, $k sales):
> | Ads (x) | 10 | 15 | 20 | 25 | 30 |
> | Sales (y) | 45 | 60 | 75 | 90 | 105 |
> 
> $\bar{x} = 20$, $\bar{y} = 75$
> 
> $\sum(x_i-\bar{x})(y_i-\bar{y}) = 750$
> 
> $\sum(x_i-\bar{x})^2 = 250$
> 
> $\hat{\beta}_1 = 750/250 = 3$ → Every $1k in ads → $3k in sales
> 
> $\hat{\beta}_0 = 75 - 3(20) = 15$
> 
> **Regression equation:** $\widehat{\text{Sales}} = 15 + 3 \times \text{Ads}$

---

### Chapter 5: Multiple Regression & Econometric Inference

**Definition — Multiple Linear Regression:**
Extends simple regression to include $k$ independent variables:
$$Y_i = \beta_0 + \beta_1 X_{1i} + \beta_2 X_{2i} + ... + \beta_k X_{ki} + u_i$$

**Interpretation of Coefficients:**
$\beta_j$ = change in $Y$ for a one-unit change in $X_j$, **holding all other variables constant** (ceteris paribus).

**Gauss-Markov Theorem:**
Under classical assumptions, OLS estimators are **BLUE** — Best Linear Unbiased Estimators.

**CLRM Assumptions:**

| # | Assumption | Violation | Consequence |
|---|-----------|-----------|-------------|
| 1 | Linearity | Wrong functional form | Biased estimates |
| 2 | Random sampling | Clustered data | Invalid SEs |
| 3 | No perfect collinearity | $X$ is constant | Cannot estimate |
| 4 | Zero conditional mean | Omitted variable bias | Biased estimates |
| 5 | Homoskedasticity | Heteroskedasticity | Wrong SEs |
| 6 | Normality | Non-normal errors | Invalid small-sample inference |

**Hypothesis Testing:**

**t-Statistic for Testing $H_0: \beta_1 = 0$:**
$$t = \frac{\hat{\beta}_1}{SE(\hat{\beta}_1)} \sim t_{n-2}$$

**Confidence Interval:**
$$\hat{\beta}_1 \pm t_{\alpha/2, n-2} \times SE(\hat{\beta}_1)$$

**Worked Example 3: Wage-Education Regression**
> Data on years of education (X) and hourly wage $Y:
> | Education | 12 | 14 | 16 | 18 | 20 |
> | Wage | 15 | 20 | 28 | 35 | 45 |
> 
> $\hat{\beta}_1 = 4.65$, $SE(\hat{\beta}_1) = 0.82$
> 
> $t = 4.65 / 0.82 = 5.67$
> 
> Critical value $t_{0.025, 3} = 3.182$
> 
> Since $5.67 > 3.182$, we **reject $H_0$** at 5% level.
> 
> **95% CI:** $4.65 \pm 3.182(0.82) = [2.04, 7.26]$

---

### Chapter 6: Model Diagnostics

**Heteroskedasticity:**
When error variance is not constant: $\text{Var}(u_i|X_i) = \sigma_i^2$
- **Detection:** Breusch-Pagan test, White test, residual plots
- **Solution:** Heteroskedasticity-robust (White) standard errors

**Autocorrelation:**
Error terms correlated across time: $\text{Cov}(u_t, u_{t-1}) \neq 0$
- **Detection:** Durbin-Watson statistic, Breusch-Godfrey test
- **Solution:** Newey-West standard errors, GLS

**Multicollinearity:**
High correlation among independent variables
- **Detection:** VIF > 10 (severe), VIF > 5 (moderate)
- **Solution:** Drop redundant variables, combine into index

---

### Chapter 7: Time Series Analysis for Economic Data

**Key Concepts:**

| Concept | Definition |
|---------|------------|
| **Stationarity** | Mean, variance, and autocovariance constant over time |
| **Trend** | Long-term direction |
| **Seasonality** | Regular periodic fluctuations |
| **White noise** | $u_t \sim iid(0, \sigma^2)$ |

**Autoregressive Model AR(1):**
$$Y_t = \phi_0 + \phi_1 Y_{t-1} + \varepsilon_t$$

Stationary if $|\phi_1| < 1$

**Dickey-Fuller Test:**
- $H_0$: Series has unit root (non-stationary)
- $H_1$: Series is stationary

**Spurious Regression:**
Regressing two non-stationary series can produce high R² even with no true relationship.

---

### Chapter 8: Causal Inference & Policy Evaluation

**The Fundamental Problem:**
We can never observe the counterfactual — what would have happened under a different treatment.

**Methods for Causal Inference:**

| Method | Description | Key Assumption |
|--------|-------------|----------------|
| **RCT** | Random assignment to treatment/control | Randomisation ensures balance |
| **Difference-in-Differences** | Compare changes over time | Parallel trends |
| **Instrumental Variables** | Use variable correlated with X but not error | Relevance and exogeneity |
| **Regression Discontinuity** | Compare units just above/below threshold | Smoothness at cutoff |
| **Propensity Score Matching** | Match treated and control units | Selection on observables |

**Difference-in-Differences:**
$$\text{Effect} = (\bar{Y}_{\text{treated, after}} - \bar{Y}_{\text{treated, before}}) - (\bar{Y}_{\text{control, after}} - \bar{Y}_{\text{control, before}})$$

**Worked Example 4: Minimum Wage Policy**
> State A raises minimum wage (treatment). State B does not (control).
> 
> | | Before | After | Change |
> |---|--------|-------|--------|
> | State A (treated) | 100 | 115 | +15 |
> | State B (control) | 100 | 105 | +5 |
> 
> **DiD Estimate:** $15 - 5 = 10$
> 
> The minimum wage increase raised employment by 10 units after accounting for trends.

---

### Chapter 9: A/B Testing & Business Experimentation

**Definition — A/B Testing:**
A controlled experiment comparing two versions to determine which performs better.

**Steps:**
1. Define hypothesis
2. Identify primary metric
3. Determine sample size (power analysis)
4. Randomly assign users to A or B
5. Run experiment for sufficient duration
6. Analyse with statistical test
7. Implement winner

**Two-Sample t-Test:**
$$t = \frac{\bar{x}_A - \bar{x}_B}{\sqrt{\frac{s_A^2}{n_A} + \frac{s_B^2}{n_B}}}$$

---

### Chapter 10: KPIs, Metrics & The Balanced Scorecard

**Definition — KPI:**
A measurable value demonstrating how effectively an organisation achieves objectives.

**SMART Criteria:** Specific, Measurable, Achievable, Relevant, Time-bound

**Common Business Metrics:**

| Domain | Metric | Formula |
|--------|--------|---------|
| Marketing | CAC | Total marketing cost / New customers |
| Marketing | Conversion rate | Conversions / Total visitors × 100% |
| Marketing | ROI | (Revenue − Cost) / Cost × 100% |
| Finance | NPV | $\sum \frac{CF_t}{(1+r)^t}$ − Initial investment |
| Operations | Inventory turnover | COGS / Average inventory |

**Balanced Scorecard:**
1. **Financial:** Revenue, profit, ROI
2. **Customer:** Satisfaction, retention, NPS
3. **Internal Process:** Efficiency, quality, cycle time
4. **Learning & Growth:** Training, innovation, engagement

---

### Exam Focus: Business Analytics & Econometrics

**High-Yield Topics:**
- Interpreting OLS coefficients (ceteris paribus)
- Conducting t-tests and constructing confidence intervals
- Testing CLRM assumptions
- Distinguishing correlation vs causation
- Choosing appropriate causal inference method
- A/B test design and interpretation
- Calculating business metrics (CAC, ROI, conversion)

**Common Exam Traps:**
- Forgetting coefficients are marginal effects holding other variables constant
- Confusing statistical significance with economic significance
- Ignoring heteroskedasticity in cross-sectional data
- Running regressions with non-stationary time series
- Assuming randomisation in observational studies

**Key Formulas:**
- OLS slope: $\hat{\beta}_1 = \frac{\text{Cov}(X,Y)}{\text{Var}(X)}$
- $R^2 = 1 - \frac{SSR}{SST}$
- t-statistic: $t = \frac{\hat{\beta}}{SE(\hat{\beta})}$
- DiD: $(\Delta \text{Treated}) - (\Delta \text{Control})$
