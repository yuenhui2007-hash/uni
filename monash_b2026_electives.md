# Monash B2026 — Electives: Business Analytics & Econometrics Notes

## Unit E1: ETC2440 — Business Analytics

### Learning Outcomes

#### LO1: Apply mathematical and statistical techniques to analyse business data and draw actionable inferences

**Definition — Business Analytics:**
The iterative, methodical exploration of an organisation's data with emphasis on statistical analysis. It transforms raw data into actionable insights to drive business decisions, optimise processes, and create competitive advantage.

**The Three Types of Analytics:**

| Type | Question | Techniques | Example |
|------|----------|------------|---------|
| **Descriptive** | What happened? | Dashboards, reports, visualisation, summary stats | Monthly sales report showing revenue trends |
| **Predictive** | What will happen? | Regression, time-series forecasting, ML classification | Predicting next quarter's demand |
| **Prescriptive** | What should we do? | Optimisation, simulation, decision trees | Optimal pricing strategy across regions |

---

### Chapter 1: Data Types & Sources

**Structured vs Unstructured Data:**
- **Structured:** Organised in rows/columns (spreadsheets, SQL databases, transaction records)
- **Unstructured:** Text, images, audio, social media posts, emails
- **Semi-structured:** JSON, XML, log files with partial organisation

**The Data Analysis Pipeline:**
1. **Problem formulation** → Define business question clearly
2. **Data collection** → Gather relevant data from internal/external sources
3. **Data cleaning** → Handle missing values, outliers, inconsistencies
4. **Exploratory analysis** → Visualise patterns, correlations, distributions
5. **Modelling** → Apply statistical/ML models
6. **Validation** → Test model accuracy and robustness
7. **Communication** → Present findings with visualisations
8. **Implementation** → Deploy insights into business operations

**Data Quality Dimensions:**
- **Accuracy:** Correct values (e.g., age = 150 is invalid)
- **Completeness:** No excessive missing data
- **Consistency:** Same format across sources (e.g., dates as DD/MM/YYYY)
- **Timeliness:** Data current enough for decision-making
- **Uniqueness:** No duplicate records

---

### Chapter 2: Descriptive Analytics

**Definition — Central Tendency:**
Measures that identify the centre or typical value of a dataset.

| Measure | Formula | When to Use |
|---------|---------|-------------|
| **Mean** | $\bar{x} = \frac{\sum x_i}{n}$ | Symmetric data, no extreme outliers |
| **Median** | Middle value when sorted | Skewed data, presence of outliers |
| **Mode** | Most frequent value | Categorical data, identifying peaks |

**Definition — Dispersion:**
Measures of spread that quantify how data varies around the centre.

| Measure | Formula | Interpretation |
|---------|---------|----------------|
| **Range** | Max − Min | Total spread; sensitive to outliers |
| **Variance** | $s^2 = \frac{\sum(x_i - \bar{x})^2}{n-1}$ | Average squared deviation |
| **Std Dev** | $s = \sqrt{s^2}$ | Typical distance from mean (same units as data) |
| **IQR** | Q3 − Q1 | Spread of middle 50%; robust to outliers |
| **CV** | $\frac{s}{\bar{x}} \times 100\%$ | Relative dispersion; compare across scales |

**Worked Example 1: Customer Spend Analysis**
> A retailer records daily customer spending ($): 45, 52, 48, 120, 50, 47, 51, 49, 500, 53
> 
> **Mean:** $(45+52+48+120+50+47+51+49+500+53)/10 = 101.5$
> 
> **Median (sorted):** 45, 47, 48, 49, **50, 51**, 52, 53, 120, 500 → $(50+51)/2 = 50.5$
> 
> **Insight:** Mean ($101.50) is heavily skewed by outliers ($120, $500). Median ($50.50) better represents typical spend.

---

### Chapter 3: Data Visualisation

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
- Use consistent colour schemes (avoid rainbow palettes)
- Start bar charts at zero to avoid distorting proportions
- Avoid 3D effects — they distort perception
- Use annotations to highlight key insights
- Keep it simple: one message per chart

**Definition — Dashboard:**
A visual display of the most important information needed to achieve one or more objectives, consolidated on a single screen so it can be monitored at a glance.

---

### Chapter 4: Predictive Analytics — Regression for Business

**Definition — Simple Linear Regression:**
A statistical method that models the relationship between a dependent variable $y$ and one independent variable $x$ as:
$$y = \beta_0 + \beta_1 x + \varepsilon$$

Where:
- $\beta_0$ = intercept (value of $y$ when $x=0$)
- $\beta_1$ = slope (change in $y$ for a one-unit change in $x$)
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
| **RMSE** | $\sqrt{\frac{\sum(y_i - \hat{y}_i)^2}{n}}$ | Typical prediction error in original units |
| **MAE** | $\frac{\sum|y_i - \hat{y}_i|}{n}$ | Average absolute error |

**Worked Example 2: Advertising vs Sales**
> Given monthly data ($k spent on ads, $k sales):
> | Ads (x) | 10 | 15 | 20 | 25 | 30 |
> | Sales (y) | 45 | 60 | 75 | 90 | 105 |
> 
> $\bar{x} = 20$, $\bar{y} = 75$
> 
> $\sum(x_i-\bar{x})(y_i-\bar{y}) = (-10)(-30)+(-5)(-15)+(0)(0)+(5)(15)+(10)(30) = 750$
> 
> $\sum(x_i-\bar{x})^2 = 100+25+0+25+100 = 250$
> 
> $\hat{\beta}_1 = 750/250 = 3$ → Every $1k in ads → $3k in sales
> 
> $\hat{\beta}_0 = 75 - 3(20) = 15$
> 
> **Regression equation:** $\widehat{\text{Sales}} = 15 + 3 \times \text{Ads}$
> 
> **Prediction:** For $22k ads → $15 + 3(22) = \$81k$ sales

---

### Chapter 5: A/B Testing & Experimentation

**Definition — A/B Testing:**
A controlled experiment comparing two versions (A = control, B = treatment) to determine which performs better on a specified metric.

**Steps in A/B Testing:**
1. Define hypothesis (e.g., "New checkout page increases conversion")
2. Identify primary metric (conversion rate, click-through rate)
3. Determine sample size (power analysis)
4. Randomly assign users to A or B
5. Run experiment for sufficient duration
6. Analyse results with statistical test
7. Make decision and implement winner

**Hypothesis Testing for A/B:**
- $H_0$: $\mu_A = \mu_B$ (no difference)
- $H_1$: $\mu_A \neq \mu_B$ (two-tailed) or directional

**Two-Sample t-Test:**
$$t = \frac{\bar{x}_A - \bar{x}_B}{\sqrt{\frac{s_A^2}{n_A} + \frac{s_B^2}{n_B}}}$$

Reject $H_0$ if $|t| > t_{\alpha/2, df}$ or p-value $< \alpha$ (typically 0.05).

**Worked Example 3: Email Campaign Test**
> Version A (control): 1,000 emails sent, 120 opened → $\hat{p}_A = 0.12$
> 
> Version B (new subject line): 1,000 emails sent, 150 opened → $\hat{p}_B = 0.15$
> 
> Pooled proportion: $\hat{p} = (120+150)/2000 = 0.135$
> 
> $SE = \sqrt{0.135(0.865)(1/1000 + 1/1000)} = 0.0153$
> 
> $z = (0.15 - 0.12)/0.0153 = 1.96$
> 
> p-value ≈ 0.05 → **Marginally significant**. New subject line likely improves open rate by 3 percentage points.

---

### Chapter 6: Big Data & Machine Learning Basics

**Definition — Big Data:**
Datasets characterised by high volume, velocity, and variety (the "3Vs") that exceed the capacity of traditional data processing systems.

| V | Description | Example |
|---|-------------|---------|
| **Volume** | Massive scale of data | Transaction records from millions of customers |
| **Velocity** | Speed of data generation | Real-time sensor data, stock tickers |
| **Variety** | Different data types | Structured DB + unstructured social media + images |

**Supervised vs Unsupervised Learning:**

| Aspect | Supervised | Unsupervised |
|--------|-----------|--------------|
| **Training data** | Labelled (input → known output) | Unlabelled |
| **Goal** | Predict outcomes | Find hidden patterns |
| **Examples** | Regression, classification | Clustering, association rules |
| **Business use** | Credit scoring, churn prediction | Customer segmentation |

**Common ML Algorithms for Business:**
- **Linear/Logistic Regression:** Baseline predictive models
- **Decision Trees:** Interpretable rules for classification
- **Random Forest:** Ensemble of trees for better accuracy
- **K-Means Clustering:** Segment customers into groups
- **Association Rules:** Market basket analysis ("Customers who bought X also bought Y")

**Definition — Overfitting:**
When a model learns the training data too well, capturing noise rather than underlying patterns. It performs well on training data but poorly on new data. Solution: cross-validation, regularisation, simpler models.

---

### Chapter 7: KPIs & Metrics Framework

**Definition — KPI (Key Performance Indicator):**
A measurable value that demonstrates how effectively an organisation is achieving key business objectives.

**SMART Criteria for KPIs:**
- **S**pecific: Clearly defined
- **M**easurable: Quantifiable
- **A**chievable: Realistic target
- **R**elevant: Linked to business goal
- **T**ime-bound: Defined time period

**Common Business Metrics:**

| Domain | Metric | Formula |
|--------|--------|---------|
| Marketing | CAC | Total marketing cost / New customers acquired |
| Marketing | Conversion rate | Conversions / Total visitors × 100% |
| Marketing | ROI | (Revenue − Cost) / Cost × 100% |
| Finance | NPV | $\sum \frac{CF_t}{(1+r)^t}$ − Initial investment |
| Operations | Inventory turnover | COGS / Average inventory |
| HR | Employee turnover | Leavers / Average headcount × 100% |

**Balanced Scorecard Framework:**
Four perspectives for holistic performance measurement:
1. **Financial:** Revenue, profit, ROI
2. **Customer:** Satisfaction, retention, NPS
3. **Internal Process:** Efficiency, quality, cycle time
4. **Learning & Growth:** Training, innovation, employee engagement

---

### Exam Focus: Business Analytics

**High-Yield Topics:**
- Interpreting regression coefficients and R²
- Choosing appropriate visualisations
- A/B test design and hypothesis testing
- Distinguishing descriptive vs predictive vs prescriptive
- Calculating and interpreting business metrics (CAC, ROI, conversion)

**Common Exam Traps:**
- Confusing correlation with causation
- Using mean when median is more appropriate
- Overlooking data quality issues
- Ignoring practical significance vs statistical significance
- Selecting wrong chart type for the data

---

## Unit E2: ETC2410 — Introductory Econometrics

### Learning Outcomes

#### LO1: Apply mathematical and statistical techniques to the analysis of economic data, drawing insightful inferences for knowledge advancement and policy making

**Definition — Econometrics:**
The quantitative analysis of actual economic phenomena based on the concurrent development of theory and observation, related by appropriate methods of inference. It bridges economic theory, mathematics, and statistical inference.

**The Econometric Approach:**
1. **Economic Theory** → Specify a model based on theoretical relationships
2. **Data Collection** → Gather relevant economic data
3. **Model Specification** → Choose functional form and variables
4. **Estimation** → Use statistical methods (OLS, ML, GMM)
5. **Inference** → Hypothesis testing, confidence intervals
6. **Diagnostic Checking** → Verify model assumptions
7. **Policy Analysis** → Use model for forecasting or policy simulation

---

### Chapter 1: The Linear Regression Model

**Definition — Population Regression Function (PRF):**
$$Y_i = \beta_0 + \beta_1 X_i + u_i$$

Where:
- $Y_i$ = dependent variable (outcome)
- $X_i$ = independent variable (regressor)
- $\beta_0, \beta_1$ = true population parameters
- $u_i$ = error term (captures all other factors affecting $Y$)

**Definition — Sample Regression Function (SRF):**
$$\hat{Y}_i = \hat{\beta}_0 + \hat{\beta}_1 X_i$$

Where $\hat{\beta}_0$ and $\hat{\beta}_1$ are OLS estimates from sample data.

**Residual:** $e_i = Y_i - \hat{Y}_i$ (difference between observed and predicted)

**Error:** $u_i = Y_i - E[Y|X_i]$ (difference between observed and true conditional expectation)

---

### Chapter 2: OLS Estimation

**OLS Estimators — Derivation:**
Minimise sum of squared residuals:
$$\min \sum_{i=1}^{n} e_i^2 = \sum_{i=1}^{n} (Y_i - \hat{\beta}_0 - \hat{\beta}_1 X_i)^2$$

Taking partial derivatives and setting to zero yields:

$$\hat{\beta}_1 = \frac{\sum(X_i - \bar{X})(Y_i - \bar{Y})}{\sum(X_i - \bar{X})^2}$$

$$\hat{\beta}_0 = \bar{Y} - \hat{\beta}_1 \bar{X}$$

**Worked Example 4: Wage-Education Regression**
> Data on years of education (X) and hourly wage $Y (in $):
> | Education | 12 | 14 | 16 | 18 | 20 |
> | Wage | 15 | 20 | 28 | 35 | 45 |
> 
> $\bar{X} = 16$, $\bar{Y} = 28.6$
> 
> $\sum(X_i-\bar{X})(Y_i-\bar{Y}) = (-4)(-13.6)+(-2)(-8.6)+(0)(-0.6)+(2)(6.4)+(4)(16.4) = 186$
> 
> $\sum(X_i-\bar{X})^2 = 16+4+0+4+16 = 40$
> 
> $\hat{\beta}_1 = 186/40 = 4.65$ → Each additional year of education increases wage by **$4.65/hour**
> 
> $\hat{\beta}_0 = 28.6 - 4.65(16) = -45.8$
> 
> **Equation:** $\widehat{\text{Wage}} = -45.8 + 4.65 \times \text{Education}$

---

### Chapter 3: Properties of OLS Estimators

**Gauss-Markov Theorem:**
Under assumptions 1-5 (below), OLS estimators are **BLUE** — Best Linear Unbiased Estimators.

**Classical Linear Regression Model (CLRM) Assumptions:**

| # | Assumption | Violation | Consequence |
|---|-----------|-----------|-------------|
| 1 | **Linearity:** $Y = \beta_0 + \beta_1 X + u$ | Wrong functional form | Biased estimates |
| 2 | **Random sampling:** $(X_i, Y_i)$ i.i.d. | Clustered data | Invalid SEs |
| 3 | **No perfect collinearity:** $\text{Var}(X) > 0$ | $X$ is constant | Cannot estimate $\beta_1$ |
| 4 | **Zero conditional mean:** $E[u|X] = 0$ | Omitted variable bias | Biased estimates |
| 5 | **Homoskedasticity:** $\text{Var}(u|X) = \sigma^2$ | Heteroskedasticity | Inefficient, wrong SEs |
| 6 | **Normality:** $u \sim N(0, \sigma^2)$ | Non-normal errors | Invalid small-sample inference |

**Key Properties:**
- **Unbiasedness:** $E[\hat{\beta}_1] = \beta_1$ (on average, OLS gets it right)
- **Consistency:** $\hat{\beta}_1 \to \beta_1$ as $n \to \infty$
- **Efficiency:** Among all unbiased linear estimators, OLS has smallest variance

---

### Chapter 4: Inference in Regression

**Estimated Variance of Error:**
$$\hat{\sigma}^2 = \frac{\sum e_i^2}{n-2} = \frac{SSR}{n-2}$$

**Standard Errors of OLS Estimators:**
$$SE(\hat{\beta}_1) = \sqrt{\frac{\hat{\sigma}^2}{\sum(X_i - \bar{X})^2}}$$

$$SE(\hat{\beta}_0) = \sqrt{\hat{\sigma}^2 \left(\frac{1}{n} + \frac{\bar{X}^2}{\sum(X_i - \bar{X})^2}\right)}$$

**t-Statistic for Testing $H_0: \beta_1 = 0$:**
$$t = \frac{\hat{\beta}_1 - 0}{SE(\hat{\beta}_1)} \sim t_{n-2}$$

**Confidence Interval:**
$$\hat{\beta}_1 \pm t_{\alpha/2, n-2} \times SE(\hat{\beta}_1)$$

**Worked Example 5: Testing Significance of Education**
> Continuing Wage-Education example:
> - $\hat{\beta}_1 = 4.65$, $SE(\hat{\beta}_1) = 0.82$
> - $n = 5$, so $df = 3$
> 
> $t = 4.65 / 0.82 = 5.67$
> 
> Critical value $t_{0.025, 3} = 3.182$
> 
> Since $5.67 > 3.182$, we **reject $H_0$** at 5% level.
> 
> Education has a statistically significant effect on wages.
> 
> **95% CI:** $4.65 \pm 3.182(0.82) = [2.04, 7.26]$
> 
> We are 95% confident each year of education increases wage by $2.04 to $7.26.

---

### Chapter 5: Multiple Regression

**Definition — Multiple Linear Regression:**
Extends simple regression to include $k$ independent variables:
$$Y_i = \beta_0 + \beta_1 X_{1i} + \beta_2 X_{2i} + ... + \beta_k X_{ki} + u_i$$

**Matrix Form:**
$$\mathbf{Y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{u}$$

**OLS Estimator (Matrix):**
$$\hat{\boldsymbol{\beta}} = (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{Y}$$

**Interpretation of Coefficients:**
$\beta_j$ = change in $Y$ for a one-unit change in $X_j$, **holding all other variables constant** (ceteris paribus).

**Worked Example 6: Wage with Experience**
> $\widehat{\text{Wage}} = -5.2 + 3.8\ \text{Educ} + 0.5\ \text{Exper} - 0.01\ \text{Exper}^2$
> 
> **Interpretation:**
> - Education: Each additional year increases wage by **$3.80/hour**, holding experience constant
> - Experience: At low experience, each year adds $0.50, but effect diminishes (negative squared term)
> - Turning point: $\partial \text{Wage}/\partial \text{Exper} = 0.5 - 0.02\ \text{Exper} = 0$ → Exper = 25 years

---

### Chapter 6: Model Diagnostics

**Definition — Heteroskedasticity:**
When the variance of the error term is not constant across observations: $\text{Var}(u_i|X_i) = \sigma_i^2$.

**Detection:**
- Visual: Plot residuals vs fitted values — fan shape indicates heteroskedasticity
- Breusch-Pagan test: Regress $e_i^2$ on $X$ variables, test joint significance
- White test: More general test including squares and cross-products

**Solutions:**
- **Heteroskedasticity-robust (White) standard errors**
- Weighted Least Squares (WLS)
- Transform variables (e.g., log transformation)

**Definition — Autocorrelation (Serial Correlation):**
Error terms are correlated across time: $\text{Cov}(u_t, u_{t-1}) \neq 0$.

**Detection:**
- Durbin-Watson statistic: $d \approx 2(1-\hat{\rho})$
  - $d \approx 2$: no autocorrelation
  - $d < 2$: positive autocorrelation
  - $d > 2$: negative autocorrelation
- Breusch-Godfrey LM test

**Solutions:**
- Newey-West standard errors (HAC)
- Generalised Least Squares (GLS)
- Include lagged dependent variable

**Definition — Multicollinearity:**
High correlation among independent variables, making it difficult to isolate individual effects.

**Detection:**
- High R² but individually insignificant coefficients
- High Variance Inflation Factor (VIF): $VIF_j = \frac{1}{1-R_j^2}$
  - VIF > 10: severe multicollinearity
  - VIF > 5: moderate concern

**Solutions:**
- Drop redundant variables
- Combine into index
- Collect more data
- Use ridge regression (biased but lower variance)

---

### Chapter 7: Time Series Analysis

**Definition — Time Series:**
Data collected at regular intervals over time. Special consideration needed because observations are typically autocorrelated.

**Key Concepts:**

| Concept | Definition |
|---------|------------|
| **Stationarity** | Mean, variance, and autocovariance are constant over time |
| **Trend** | Long-term direction (upward/downward) |
| **Seasonality** | Regular periodic fluctuations |
| **Cyclical** | Irregular long-term cycles (business cycles) |
| **White noise** | $u_t \sim iid(0, \sigma^2)$ — no pattern, pure randomness |

**Autoregressive Model AR(1):**
$$Y_t = \phi_0 + \phi_1 Y_{t-1} + \varepsilon_t$$

- Stationary if $|\phi_1| < 1$
- $\phi_1$ close to 1: highly persistent series

**Dickey-Fuller Test for Unit Root:**
- $H_0$: Series has unit root (non-stationary)
- $H_1$: Series is stationary
- Reject $H_0$ → series is stationary

**Spurious Regression:**
Regressing two non-stationary series can produce high R² and significant t-statistics even when no true relationship exists. Always check for stationarity first!

---

### Chapter 8: Causal Inference & Policy Evaluation

**Definition — Causal Inference:**
The process of determining whether a change in one variable actually causes a change in another, as opposed to mere correlation.

**The Fundamental Problem of Causal Inference:**
We can never observe the counterfactual — what would have happened to the same unit under a different treatment.

**Methods for Causal Inference:**

| Method | Description | Assumption |
|--------|-------------|------------|
| **Randomised Control Trial (RCT)** | Random assignment to treatment/control | Randomisation ensures balance |
| **Difference-in-Differences (DiD)** | Compare changes over time between treated and control | Parallel trends |
| **Instrumental Variables (IV)** | Use variable correlated with X but not with error | Relevance and exogeneity |
| **Regression Discontinuity (RD)** | Compare units just above/below threshold | Smoothness at cutoff |
| **Propensity Score Matching** | Match treated and control units on observables | Selection on observables |

**Difference-in-Differences:**
$$\text{Effect} = (\bar{Y}_{\text{treated, after}} - \bar{Y}_{\text{treated, before}}) - (\bar{Y}_{\text{control, after}} - \bar{Y}_{\text{control, before}})$$

**Worked Example 7: Minimum Wage Policy (DiD)**
> State A raises minimum wage (treatment). State B does not (control).
> 
> | | Before | After | Change |
> |---|--------|-------|--------|
> | State A (treated) | 100 | 115 | +15 |
> | State B (control) | 100 | 105 | +5 |
> 
> **DiD Estimate:** $(115-100) - (105-100) = 15 - 5 = 10$
> 
> The minimum wage increase raised employment by 10 units, after accounting for the trend in the control state.

---

### Exam Focus: Econometrics

**High-Yield Topics:**
- Interpreting OLS coefficients (ceteris paribus)
- Conducting t-tests and constructing confidence intervals
- Testing CLRM assumptions and knowing consequences of violations
- Distinguishing between $R^2$ and adjusted $R^2$
- Understanding why correlation ≠ causation
- Choosing appropriate causal inference method

**Common Exam Traps:**
- Forgetting that coefficients are marginal effects holding other variables constant
- Confusing statistical significance with economic significance
- Ignoring heteroskedasticity in cross-sectional data
- Running regressions with non-stationary time series without differencing
- Assuming randomisation in observational studies

**Key Formulas to Memorise:**
- OLS slope: $\hat{\beta}_1 = \frac{\text{Cov}(X,Y)}{\text{Var}(X)}$
- $R^2 = \frac{SSE}{SST} = 1 - \frac{SSR}{SST}$
- t-statistic: $t = \frac{\hat{\beta} - \beta_0}{SE(\hat{\beta})}$
- White SE formula (conceptually): robust to heteroskedasticity

---

## Integration: Analytics for Policy Making

### Connecting Business Analytics and Econometrics

**When to Use Which:**

| Situation | Tool | Example |
|-----------|------|---------|
| Optimise internal operations | Business Analytics | Inventory management, pricing |
| Evaluate government policy | Econometrics | Minimum wage impact, tax effects |
| Predict consumer behaviour | Both | Demand forecasting, churn prediction |
| Test marketing campaigns | Business Analytics (A/B testing) | Email subject line effectiveness |
| Measure programme effectiveness | Econometrics (DiD, IV) | Job training programme impact |

**The Policy Analysis Pipeline:**
1. **Define policy question** → Clear, measurable objective
2. **Collect relevant data** → Administrative, survey, or experimental
3. **Choose analytical method** → Match method to data and question
4. **Estimate effects** → Regression, DiD, RCT, etc.
5. **Validate robustness** → Sensitivity checks, alternative specifications
6. **Communicate findings** → Clear visualisations, policy briefs
7. **Monitor implementation** → Track outcomes post-policy

**Ethical Considerations:**
- **Data privacy:** Anonymise personal data; comply with regulations (PDPA, GDPR)
- **Algorithmic bias:** Check that models don't discriminate against protected groups
- **Transparency:** Document methods and assumptions for reproducibility
- **Causality claims:** Don't overstate findings; acknowledge limitations

**Final Exam Tip:**
When answering applied questions, always:
1. State the appropriate method
2. Justify why it's suitable
3. Write down the key equation
4. Interpret coefficients in context
5. Discuss assumptions and potential violations
