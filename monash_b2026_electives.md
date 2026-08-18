# Monash B2026 — Elective: Business Analytics & Econometrics

## Unit E1: ETC2440 — Business Analytics & Econometrics

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

**Types of Data in Econometrics:**

| Type | Description | Example |
|------|-------------|---------|
| **Cross-sectional** | Many units, one time point | 500 firms' profits in 2024 |
| **Time series** | One unit, many time points | Malaysia's GDP 2000–2024 |
| **Panel (longitudinal)** | Many units, many time points | 100 firms over 10 years |
| **Pooled cross-sections** | Cross-sections at different times | Surveys in 2020 and 2024 |

---

### Chapter 2: Descriptive Statistics

**Measures of Central Tendency:**

| Measure | Formula | When to Use |
|---------|---------|-------------|
| **Mean** | $\bar{x} = \frac{\sum x_i}{n}$ | Symmetric data, no extreme outliers |
| **Median** | Middle value when sorted | Skewed data, presence of outliers |
| **Mode** | Most frequent value | Categorical data, identifying peaks |
| **Weighted Mean** | $\bar{x}_w = \frac{\sum w_i x_i}{\sum w_i}$ | Different observations have different importance |

**Measures of Dispersion:**

| Measure | Formula | Interpretation |
|---------|---------|----------------|
| **Range** | Max − Min | Total spread; sensitive to outliers |
| **Variance** | $s^2 = \frac{\sum(x_i - \bar{x})^2}{n-1}$ | Average squared deviation |
| **Std Dev** | $s = \sqrt{s^2}$ | Typical distance from mean |
| **IQR** | Q3 − Q1 | Spread of middle 50%; robust to outliers |
| **CV** | $\frac{s}{\bar{x}} \times 100\%$ | Relative dispersion |

**Measures of Shape:**
- **Skewness:** Asymmetry of distribution
  - Positive: right tail longer (mean > median)
  - Negative: left tail longer (mean < median)
- **Kurtosis:** Peakedness / tail heaviness
  - High kurtosis = heavy tails, more extreme values

**Worked Example 1: Customer Spend Analysis**
> A retailer records daily customer spending ($): 45, 52, 48, 120, 50, 47, 51, 49, 500, 53
> 
> **Mean:** $(45+52+48+120+50+47+51+49+500+53)/10 = 101.5$
> 
> **Median (sorted):** 45, 47, 48, 49, **50, 51**, 52, 53, 120, 500 → $(50+51)/2 = 50.5$
> 
> **Mode:** No mode (all values unique except none repeated)
> 
> **Range:** $500 - 45 = 455$
> 
> **Variance:** $s^2 = \frac{(45-101.5)^2 + ... + (53-101.5)^2}{9} = 20,802.5$
> 
> **Std Dev:** $s = \sqrt{20,802.5} \approx 144.2$
> 
> **IQR:** Q1 = 48, Q3 = 53 → IQR = 5
> 
> **Insight:** Mean ($101.50) is skewed by outliers ($120, $500). Median ($50.50) and IQR (5) better represent typical spend. High standard deviation indicates extreme variability.

---

### Chapter 3: Probability & Probability Distributions

**Basic Probability Rules:**
- **Complement:** $P(A^c) = 1 - P(A)$
- **Addition:** $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- **Multiplication:** $P(A \cap B) = P(A|B) \cdot P(B)$
- **Conditional:** $P(A|B) = \frac{P(A \cap B)}{P(B)}$
- **Independence:** $P(A \cap B) = P(A) \cdot P(B)$

**Bayes' Theorem:**
$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

**Key Discrete Distributions:**

| Distribution | PMF | Mean | Variance | Use Case |
|-------------|-----|------|----------|----------|
| **Bernoulli** | $P(X=1)=p$, $P(X=0)=1-p$ | $p$ | $p(1-p)$ | Single trial (success/failure) |
| **Binomial** | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ | $n$ independent trials |
| **Poisson** | $\frac{\lambda^k e^{-\lambda}}{k!}$ | $\lambda$ | $\lambda$ | Rare events, count data |

**Key Continuous Distributions:**

| Distribution | PDF | Mean | Variance | Use Case |
|-------------|-----|------|----------|----------|
| **Uniform** | $\frac{1}{b-a}$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ | Equal likelihood |
| **Normal** | $\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ | $\mu$ | $\sigma^2$ | Natural phenomena, CLT |
| **t** | (complex) | 0 | $\frac{\nu}{\nu-2}$ | Small samples, unknown variance |
| **Chi-squared** | (complex) | $k$ | $2k$ | Variance tests, goodness-of-fit |
| **F** | (complex) | $\frac{d_2}{d_2-2}$ | (complex) | Comparing variances, ANOVA |

**Standard Normal Distribution (Z):**
$$Z = \frac{X - \mu}{\sigma}$$

**Worked Example 2: Normal Distribution Application**
> Exam scores are normally distributed with $\mu = 72$, $\sigma = 8$.
> 
> **Q1:** What proportion scores above 80?
> $Z = (80 - 72)/8 = 1.0$ → $P(Z > 1.0) = 1 - 0.8413 = 0.1587$ ≈ **15.9%**
> 
> **Q2:** What score puts you in the top 10%?
> $Z_{0.90} = 1.28$ → $X = 72 + 1.28(8) = 82.24$ ≈ **82**
> 
> **Q3:** What proportion scores between 64 and 80?
> $Z_{64} = -1.0$, $Z_{80} = 1.0$ → $P(-1 < Z < 1) = 0.6826$ ≈ **68.3%**

---

### Chapter 4: Sampling & the Central Limit Theorem

**Definition — Sampling Distribution:**
The probability distribution of a statistic (e.g., sample mean) computed from all possible samples of size $n$ from a population.

**Central Limit Theorem (CLT):**
For a sufficiently large sample size ($n \geq 30$ typically), the sampling distribution of the sample mean will be approximately normal, regardless of the population distribution:
$$\bar{X} \sim N\left(\mu, \frac{\sigma^2}{n}\right)$$

**Standard Error of the Mean:**
$$SE(\bar{X}) = \frac{\sigma}{\sqrt{n}}$$
When $\sigma$ is unknown, use sample standard deviation $s$.

**Confidence Intervals:**

| Parameter | Formula | When to Use |
|-----------|---------|-------------|
| Mean ($\sigma$ known) | $\bar{x} \pm z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$ | Large sample or known population SD |
| Mean ($\sigma$ unknown) | $\bar{x} \pm t_{\alpha/2, n-1} \cdot \frac{s}{\sqrt{n}}$ | Small sample, unknown SD |
| Proportion | $\hat{p} \pm z_{\alpha/2} \cdot \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$ | Categorical data |

**Sample Size Determination:**
$$n = \left(\frac{z_{\alpha/2} \cdot \sigma}{E}\right)^2$$
Where $E$ is the desired margin of error.

**Worked Example 3: Confidence Interval**
> A sample of 50 customers shows mean spend = $85, standard deviation = $20.
> 
> **95% CI:** $85 \pm 1.96 \cdot \frac{20}{\sqrt{50}} = 85 \pm 5.54 = [79.46, 90.54]$
> 
> **Interpretation:** We are 95% confident the true population mean spend is between $79.46 and $90.54.
> 
> **Sample size for ±$5 margin:** $n = (1.96 \cdot 20 / 5)^2 = 61.5$ → **62 customers**

---

### Chapter 5: Hypothesis Testing

**The Testing Framework:**
1. State $H_0$ (null) and $H_1$ (alternative)
2. Choose significance level $\alpha$ (typically 0.05)
3. Calculate test statistic
4. Determine critical value or p-value
5. Make decision: reject or fail to reject $H_0$
6. State conclusion in context

**Type I and Type II Errors:**

| | $H_0$ True | $H_0$ False |
|---|---|---|
| **Reject $H_0$** | Type I Error ($\alpha$) | Correct (Power = $1-\beta$) |
| **Fail to Reject $H_0$** | Correct ($1-\alpha$) | Type II Error ($\beta$) |

**Common Tests:**

| Test | Statistic | Use |
|------|-----------|-----|
| **One-sample z** | $z = \frac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}$ | Mean vs known value, large $n$ |
| **One-sample t** | $t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}$ | Mean vs known value, small $n$ |
| **Two-sample t** | $t = \frac{\bar{x}_1 - \bar{x}_2}{SE}$ | Compare two means |
| **Paired t** | $t = \frac{\bar{d}}{s_d/\sqrt{n}}$ | Before/after same subjects |
| **Chi-squared** | $\chi^2 = \sum \frac{(O-E)^2}{E}$ | Independence, goodness-of-fit |
| **F-test** | $F = \frac{s_1^2}{s_2^2}$ | Compare two variances |

**p-value Interpretation:**
- p < 0.01: Strong evidence against $H_0$
- 0.01 ≤ p < 0.05: Moderate evidence against $H_0$
- 0.05 ≤ p < 0.10: Weak evidence against $H_0$
- p ≥ 0.10: Insufficient evidence against $H_0$

**Worked Example 4: Hypothesis Test**
> A company claims average delivery time is 30 minutes. A sample of 25 deliveries shows mean = 33 min, $s$ = 5 min. Test at $\alpha = 0.05$.
> 
> $H_0: \mu = 30$ vs $H_1: \mu > 30$
> 
> $t = \frac{33 - 30}{5/\sqrt{25}} = \frac{3}{1} = 3.0$
> 
> Critical value: $t_{0.05, 24} = 1.711$
> 
> Since $3.0 > 1.711$, **reject $H_0$**. There is significant evidence that delivery times exceed 30 minutes.

---

### Chapter 6: Data Visualisation for Business & Policy

**Choosing the Right Chart:**

| Purpose | Chart Type | When to Use |
|---------|-----------|-------------|
| Compare categories | Bar chart | Few categories, emphasis on magnitude |
| Show trends over time | Line chart | Time-series data, continuous x-axis |
| Show composition | Pie / Donut | Parts of a whole (max 5-7 segments) |
| Show distribution | Histogram | Frequency of continuous variable |
| Show relationship | Scatter plot | Correlation between two variables |
| Show hierarchy | Tree map | Nested categories with size encoding |
| Show geographic data | Choropleth map | Regional comparisons |
| Show proportions | Stacked bar | Category + sub-category composition |

**Visualisation Best Practices:**
- Always label axes with units
- Use consistent colour schemes
- Start bar charts at zero
- Avoid 3D effects
- Use annotations to highlight key insights
- One message per chart
- Ensure accessibility (colour blindness friendly)
- Provide context: title, source, date

**Dashboard Design Principles:**
1. **Know your audience** — Executives need KPIs; analysts need drill-downs
2. **5-second rule** — Key insight visible within 5 seconds
3. **Progressive disclosure** — Summary → detail → raw data
4. **Consistent layout** — Same metrics in same place across pages
5. **Interactive filters** — Time period, region, product line

---

### Chapter 7: Regression Analysis — The Core Tool

**Definition — Simple Linear Regression:**
A statistical method that models the relationship between a dependent variable $y$ and one independent variable $x$:
$$y = \beta_0 + \beta_1 x + \varepsilon$$

Where:
- $\beta_0$ = intercept (value of $y$ when $x = 0$)
- $\beta_1$ = slope (change in $y$ for one-unit change in $x$)
- $\varepsilon$ = error term (difference between observed and predicted)

**Ordinary Least Squares (OLS):**
Estimates $\beta_0$ and $\beta_1$ by minimising the sum of squared residuals:
$$\min \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$

**Key Formulas:**
$$\hat{\beta}_1 = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sum(x_i - \bar{x})^2} = \frac{\text{Cov}(x,y)}{\text{Var}(x)} = r_{xy} \cdot \frac{s_y}{s_x}$$

$$\hat{\beta}_0 = \bar{y} - \hat{\beta}_1 \bar{x}$$

**Residuals and Fitted Values:**
- Fitted value: $\hat{y}_i = \hat{\beta}_0 + \hat{\beta}_1 x_i$
- Residual: $e_i = y_i - \hat{y}_i$
- Sum of squared residuals: $SSR = \sum e_i^2$

**Model Evaluation Metrics:**

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| **R²** | $1 - \frac{SS_{res}}{SS_{tot}}$ | Proportion of variance explained (0 to 1) |
| **Adjusted R²** | $1 - \frac{SS_{res}/(n-k-1)}{SS_{tot}/(n-1)}$ | R² penalised for extra variables |
| **RMSE** | $\sqrt{\frac{\sum(y_i - \hat{y}_i)^2}{n}}$ | Typical prediction error |
| **MAE** | $\frac{\sum\|y_i - \hat{y}_i\|}{n}$ | Average absolute error |
| **MAPE** | $\frac{100\%}{n}\sum\left|\frac{y_i - \hat{y}_i}{y_i}\right|$ | Percentage error |

**Correlation vs Causation:**
- **Correlation** ($r$): Measures linear association (−1 to +1)
- **Causation**: Requires theory, research design, and often experimental/randomised data
- High correlation does NOT imply causation

**Worked Example 5: Advertising vs Sales**
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
> 
> **Prediction for $25k ads:** $\widehat{\text{Sales}} = 15 + 3(25) = 90$
> 
> **R²:** $SS_{tot} = 2250$, $SS_{res} = 0$ → **R² = 1** (perfect fit in this constructed example)

---

### Chapter 8: Multiple Regression & Econometric Inference

**Definition — Multiple Linear Regression:**
Extends simple regression to include $k$ independent variables:
$$Y_i = \beta_0 + \beta_1 X_{1i} + \beta_2 X_{2i} + ... + \beta_k X_{ki} + u_i$$

**Interpretation of Coefficients:**
$\beta_j$ = change in $Y$ for a one-unit change in $X_j$, **holding all other variables constant** (ceteris paribus).

**Gauss-Markov Theorem:**
Under classical assumptions, OLS estimators are **BLUE** — Best Linear Unbiased Estimators.

**CLRM (Classical Linear Regression Model) Assumptions:**

| # | Assumption | Violation | Consequence | Solution |
|---|-----------|-----------|-------------|----------|
| 1 | Linearity in parameters | Wrong functional form | Biased estimates | Transform variables, polynomial terms |
| 2 | Random sampling | Clustered data | Invalid SEs | Cluster-robust SEs |
| 3 | No perfect collinearity | $X$ is constant or linear combo | Cannot estimate | Drop redundant variable |
| 4 | Zero conditional mean: $E(u|X) = 0$ | Omitted variable bias | Biased estimates | Include omitted variables, instruments |
| 5 | Homoskedasticity: $\text{Var}(u|X) = \sigma^2$ | Heteroskedasticity | Wrong SEs, invalid t-tests | Robust SEs, WLS |
| 6 | Normality of errors | Non-normal errors | Invalid small-sample inference | Larger sample, bootstrap |

**Hypothesis Testing — t-Test:**

**t-Statistic for Testing $H_0: \beta_j = 0$:**
$$t = \frac{\hat{\beta}_j}{SE(\hat{\beta}_j)} \sim t_{n-k-1}$$

**Confidence Interval:**
$$\hat{\beta}_j \pm t_{\alpha/2, n-k-1} \times SE(\hat{\beta}_j)$$

**F-Test for Overall Significance:**
Tests whether all slope coefficients are simultaneously zero:
$$F = \frac{(SS_{tot} - SS_{res})/k}{SS_{res}/(n-k-1)} = \frac{R^2/k}{(1-R^2)/(n-k-1)}$$

Under $H_0$, $F \sim F_{k, n-k-1}$

**Joint Hypothesis Testing:**
Test $H_0: \beta_1 = \beta_2 = 0$ vs $H_1$: at least one ≠ 0
- Use F-test, NOT multiple t-tests (family-wise error rate)

**Worked Example 6: Wage-Education Regression**
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
> 
> **Interpretation:** Each additional year of education is associated with a $2.04 to $7.26 increase in hourly wage, holding other factors constant.

**Worked Example 7: Multiple Regression with Two Variables**
> Model: $\widehat{\text{Wage}} = 2.5 + 3.2 \cdot \text{Education} + 0.8 \cdot \text{Experience}$
> 
> | Variable | Coefficient | Std Error | t-stat | p-value |
> |----------|-------------|-----------|--------|---------|
> | Intercept | 2.5 | 1.2 | 2.08 | 0.042 |
> | Education | 3.2 | 0.5 | 6.40 | <0.001 |
> | Experience | 0.8 | 0.3 | 2.67 | 0.009 |
> 
> **R² = 0.72**, **n = 100**
> 
> **F-test for overall significance:**
> $F = \frac{0.72/2}{(1-0.72)/(100-3)} = \frac{0.36}{0.00289} = 124.6$
> 
> Critical $F_{2,97} \approx 3.09$ at 5% → **Highly significant model**
> 
> **Interpretation:** Holding experience constant, each additional year of education increases wage by $3.20. Holding education constant, each additional year of experience increases wage by $0.80.

---

### Chapter 9: Advanced Regression Topics

**Interaction Terms:**
When the effect of $X_1$ on $Y$ depends on $X_2$:
$$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \beta_3 (X_1 \cdot X_2) + u$$

**Interpretation:**
- $\beta_1$ = effect of $X_1$ when $X_2 = 0$
- $\beta_1 + \beta_3 X_2$ = effect of $X_1$ when $X_2$ takes a specific value
- $\beta_3$ = how much the effect of $X_1$ changes for a one-unit increase in $X_2$

**Polynomial Regression:**
$$Y = \beta_0 + \beta_1 X + \beta_2 X^2 + u$$

Used when relationship is non-linear (e.g., diminishing returns).

**Logarithmic Transformations:**

| Model | Form | Interpretation of $\beta_1$ |
|-------|------|---------------------------|
| **Linear-log** | $Y = \beta_0 + \beta_1 \ln(X)$ | Change in $Y$ for 1% change in $X$ |
| **Log-linear** | $\ln(Y) = \beta_0 + \beta_1 X$ | % change in $Y$ for 1-unit change in $X$ |
| **Log-log** | $\ln(Y) = \beta_0 + \beta_1 \ln(X)$ | Elasticity: % change in $Y$ for 1% change in $X$ |

**Dummy Variables:**
Binary (0/1) variables representing categories:
$$Y = \beta_0 + \beta_1 X + \beta_2 D + u$$

Where $D = 1$ for category A, 0 otherwise:
- $\beta_0$ = intercept for category B
- $\beta_0 + \beta_2$ = intercept for category A
- $\beta_2$ = difference in mean $Y$ between A and B, holding $X$ constant

**Dummy Variable Trap:**
Never include dummy variables for ALL categories + intercept. Omit one category (reference group).

---

### Chapter 10: Model Diagnostics

**Heteroskedasticity:**
When error variance is not constant: $\text{Var}(u_i|X_i) = \sigma_i^2$
- **Detection:** 
  - Visual: Residuals vs fitted plot (fan shape)
  - Breusch-Pagan test: $LM = n \cdot R^2_{aux} \sim \chi^2_k$
  - White test: More general, includes squares and cross-products
- **Consequences:** OLS still unbiased but inefficient; standard errors biased; t-tests invalid
- **Solution:** 
  - Heteroskedasticity-robust (White/Huber) standard errors
  - Weighted Least Squares (WLS)
  - Transform dependent variable (e.g., log)

**Autocorrelation (Serial Correlation):**
Error terms correlated across time: $\text{Cov}(u_t, u_{t-1}) \neq 0$
- **Detection:**
  - Durbin-Watson statistic: $DW \approx 2(1-\rho)$
    - DW ≈ 2: no autocorrelation
    - DW < 2: positive autocorrelation
    - DW > 2: negative autocorrelation
  - Breusch-Godfrey test
- **Consequences:** Standard errors biased; t-tests and F-tests invalid
- **Solution:**
  - Newey-West standard errors (HAC)
  - Generalised Least Squares (GLS)
  - Add lagged dependent variables

**Multicollinearity:**
High correlation among independent variables
- **Detection:**
  - High pairwise correlations (> 0.8)
  - Variance Inflation Factor: $VIF_j = \frac{1}{1-R_j^2}$
    - VIF > 10: severe
    - VIF > 5: moderate concern
- **Consequences:** Large standard errors; coefficients unstable; individual t-tests may be insignificant even when F-test is significant
- **Solution:**
  - Drop redundant variables
  - Combine into index
  - Principal Component Analysis (PCA)
  - Ridge regression

**Outliers and Influential Observations:**
- **Outlier:** Large residual (unusual y-value given x)
- **High leverage:** Extreme x-value
- **Influential:** Changes coefficients when removed
- **Detection:**
  - Studentised residuals (> 2 or < −2)
  - Leverage: $h_{ii} > 2(k+1)/n$
  - Cook's distance: $D_i > 4/n$

---

### Chapter 11: Time Series Analysis for Economic Data

**Key Concepts:**

| Concept | Definition |
|---------|------------|
| **Stationarity** | Mean, variance, and autocovariance constant over time |
| **Trend** | Long-term direction |
| **Seasonality** | Regular periodic fluctuations |
| **Cyclical** | Longer-term economic cycles |
| **White noise** | $u_t \sim iid(0, \sigma^2)$ |

**Autoregressive Model AR(1):**
$$Y_t = \phi_0 + \phi_1 Y_{t-1} + \varepsilon_t$$

Stationary if $|\phi_1| < 1$

**Moving Average Model MA(1):**
$$Y_t = \mu + \varepsilon_t + \theta_1 \varepsilon_{t-1}$$

**ARMA(p,q) Model:**
$$Y_t = c + \sum_{i=1}^{p}\phi_i Y_{t-i} + \varepsilon_t + \sum_{j=1}^{q}\theta_j \varepsilon_{t-j}$$

**ARIMA(p,d,q):**
ARMA applied to differenced series (d = number of differences)

**Dickey-Fuller Test for Unit Root:**
$$\Delta Y_t = \alpha + \beta t + \gamma Y_{t-1} + \varepsilon_t$$
- $H_0: \gamma = 0$ (unit root, non-stationary)
- $H_1: \gamma < 0$ (stationary)

**Spurious Regression:**
Regressing two non-stationary series can produce high R² and significant t-statistics even with no true relationship.

**Cointegration:**
When two non-stationary series have a stationary linear combination. Allows valid long-run relationships.

**Worked Example 8: AR(1) Forecasting**
> Quarterly sales follow: $Y_t = 10 + 0.7Y_{t-1} + \varepsilon_t$
> 
> Current quarter sales = 100. Forecast next quarter:
> 
> $\hat{Y}_{t+1} = 10 + 0.7(100) = 80$
> 
> Two-quarter ahead: $\hat{Y}_{t+2} = 10 + 0.7(80) = 66$
> 
> Long-run equilibrium: $Y^* = \frac{10}{1-0.7} = 33.33$

---

### Chapter 12: Causal Inference & Policy Evaluation

**The Fundamental Problem of Causal Inference:**
We can never observe the counterfactual — what would have happened under a different treatment.

**Potential Outcomes Framework:**
- $Y_{1i}$ = outcome if unit $i$ receives treatment
- $Y_{0i}$ = outcome if unit $i$ does not receive treatment
- **Treatment effect:** $\tau_i = Y_{1i} - Y_{0i}$
- **Average Treatment Effect (ATE):** $E[\tau_i] = E[Y_1 - Y_0]$
- **Selection bias:** $E[Y_0 | D=1] \neq E[Y_0 | D=0]$

**Methods for Causal Inference:**

| Method | Description | Key Assumption | When to Use |
|--------|-------------|----------------|-------------|
| **RCT** | Random assignment to treatment/control | Randomisation ensures balance | Gold standard when feasible |
| **Difference-in-Differences (DiD)** | Compare changes over time | Parallel trends | Policy changes, natural experiments |
| **Instrumental Variables (IV)** | Use variable correlated with X but not error | Relevance and exogeneity | Endogeneity, omitted variables |
| **Regression Discontinuity (RD)** | Compare units just above/below threshold | Smoothness at cutoff | Threshold-based policies |
| **Propensity Score Matching (PSM)** | Match treated and control units | Selection on observables | Observational data |
| **Fixed Effects (FE)** | Control for time-invariant unobservables | $u_i$ correlated with X but constant over time | Panel data |
| **Random Effects (RE)** | Control for random time-invariant effects | $u_i$ uncorrelated with X | Panel data, no correlation |

**Difference-in-Differences (DiD):**
$$\text{ATT} = (\bar{Y}_{\text{treated, after}} - \bar{Y}_{\text{treated, before}}) - (\bar{Y}_{\text{control, after}} - \bar{Y}_{\text{control, before}})$$

Regression form:
$$Y_{it} = \beta_0 + \beta_1 \text{Treated}_i + \beta_2 \text{After}_t + \beta_3 (\text{Treated}_i \times \text{After}_t) + u_{it}$$

$\beta_3$ = DiD estimator (treatment effect)

**Instrumental Variables (2SLS):**
When $X$ is endogenous, find instrument $Z$ such that:
1. **Relevance:** $\text{Cov}(Z, X) \neq 0$
2. **Exogeneity:** $\text{Cov}(Z, u) = 0$

**First stage:** $X = \pi_0 + \pi_1 Z + v$
**Second stage:** $Y = \beta_0 + \beta_1 \hat{X} + u$

**Fixed Effects (Within Estimator):**
$$Y_{it} = \beta_0 + \beta_1 X_{it} + \alpha_i + u_{it}$$

Where $\alpha_i$ = time-invariant individual effect
- **FE:** Removes $\alpha_i$ by demeaning (within transformation)
- **RE:** Treats $\alpha_i$ as random, uses GLS
- **Hausman test:** Choose FE if null rejected (FE preferred when in doubt)

**Worked Example 9: Minimum Wage Policy (DiD)**
> State A raises minimum wage (treatment). State B does not (control).
> 
> | | Before | After | Change |
> |---|--------|-------|--------|
> | State A (treated) | 100 | 115 | +15 |
> | State B (control) | 100 | 105 | +5 |
> 
> **DiD Estimate:** $15 - 5 = 10$
> 
> **Regression:** $Y = 100 + 0 \cdot \text{Treated} + 5 \cdot \text{After} + 10 \cdot (\text{Treated} \times \text{After})$
> 
> The minimum wage increase raised employment by 10 units after accounting for trends.
> 
> **Parallel trends assumption:** In the absence of treatment, both states would have followed the same trend. Test using pre-treatment periods.

**Worked Example 10: Instrumental Variables**
> Want to estimate effect of education ($X$) on wage ($Y$). Education is endogenous (ability bias).
> 
> **Instrument ($Z$):** Distance to nearest college (affects education but not wage directly)
> 
> **First stage:** Education = $\pi_0 + \pi_1 \cdot \text{Distance} + v$
> 
> **Second stage:** Wage = $\beta_0 + \beta_1 \cdot \widehat{\text{Education}} + u$
> 
> **F-statistic on first stage:** Must be > 10 (Staiger-Stock rule) for valid IV

---

### Chapter 13: A/B Testing & Business Experimentation

**Definition — A/B Testing:**
A controlled experiment comparing two versions (A = control, B = treatment) to determine which performs better on a predefined metric.

**Steps:**
1. Define hypothesis (null and alternative)
2. Identify primary metric (e.g., conversion rate, revenue per user)
3. Determine sample size (power analysis)
4. Randomly assign users to A or B
5. Run experiment for sufficient duration (full business cycles)
6. Analyse with statistical test
7. Check for novelty effects and segment differences
8. Implement winner, monitor rollout

**Sample Size Calculation:**
$$n = \frac{2(z_{1-\alpha/2} + z_{1-\beta})^2 \sigma^2}{\delta^2}$$

Where:
- $\alpha$ = significance level (Type I error)
- $\beta$ = Type II error (1 − power)
- $\sigma^2$ = variance
- $\delta$ = minimum detectable effect (MDE)

**Two-Sample t-Test:**
$$t = \frac{\bar{x}_A - \bar{x}_B}{\sqrt{\frac{s_A^2}{n_A} + \frac{s_B^2}{n_B}}}$$

**For proportions (conversion rates):**
$$Z = \frac{\hat{p}_A - \hat{p}_B}{\sqrt{\hat{p}(1-\hat{p})(\frac{1}{n_A} + \frac{1}{n_B})}}$$

Where $\hat{p} = \frac{x_A + x_B}{n_A + n_B}$ (pooled proportion)

**Pitfalls in A/B Testing:**
- **Peeking:** Checking results repeatedly inflates Type I error
- **Sample ratio mismatch:** Unequal randomisation
- **Novelty effects:** Users react differently to new features initially
- **Network effects:** Treatment of one user affects another
- **Multiple testing:** Testing many metrics increases false positives (Bonferroni correction)

**Worked Example 11: A/B Test for Website Conversion**
> Version A (control): 1000 visitors, 120 conversions (12%)
> Version B (treatment): 1000 visitors, 150 conversions (15%)
> 
> Pooled proportion: $\hat{p} = (120+150)/(1000+1000) = 0.135$
> 
> $SE = \sqrt{0.135(1-0.135)(1/1000 + 1/1000)} = \sqrt{0.000233} = 0.0153$
> 
> $Z = (0.15 - 0.12) / 0.0153 = 1.96$
> 
> Critical $Z_{0.025} = 1.96$ → **Significant at 5% level**
> 
> **Conclusion:** Version B has significantly higher conversion rate.

---

### Chapter 14: KPIs, Metrics & The Balanced Scorecard

**Definition — KPI (Key Performance Indicator):**
A measurable value demonstrating how effectively an organisation achieves key business objectives.

**SMART Criteria for KPIs:**
- **S**pecific: Clear and well-defined
- **M**easurable: Quantifiable
- **A**chievable: Realistic targets
- **R**elevant: Aligned with business goals
- **T**ime-bound: Defined timeframe

**Common Business Metrics:**

| Domain | Metric | Formula | Interpretation |
|--------|--------|---------|----------------|
| Marketing | CAC | Total marketing cost / New customers | Cost to acquire one customer |
| Marketing | Conversion rate | Conversions / Total visitors × 100% | % who complete desired action |
| Marketing | ROI | (Revenue − Cost) / Cost × 100% | Return on investment |
| Marketing | CTR | Clicks / Impressions × 100% | Ad engagement |
| Finance | NPV | $\sum \frac{CF_t}{(1+r)^t}$ − Initial investment | Value added in today's dollars |
| Finance | IRR | Rate where NPV = 0 | Effective annual return |
| Finance | D/E Ratio | Total debt / Total equity | Financial leverage |
| Operations | Inventory turnover | COGS / Average inventory | How often inventory sold |
| Operations | OEE | Availability × Performance × Quality | Manufacturing efficiency |
| Customer | NPS | % Promoters − % Detractors | Loyalty metric |
| Customer | Churn rate | Customers lost / Total customers | Retention indicator |
| Customer | CLV | Average purchase × Frequency × Lifespan | Customer lifetime value |

**Balanced Scorecard:**
1. **Financial:** Revenue, profit, ROI, cash flow
2. **Customer:** Satisfaction, retention, NPS, market share
3. **Internal Process:** Efficiency, quality, cycle time, defect rate
4. **Learning & Growth:** Training hours, employee satisfaction, innovation rate

**Dashboard Metrics Pyramid:**
- **Strategic (top):** 3-5 KPIs for executives
- **Tactical (middle):** Department-level metrics
- **Operational (bottom):** Real-time process indicators

---

### Chapter 15: Big Data, Machine Learning & Business Analytics

**Definition — Machine Learning:**
Algorithms that learn patterns from data to make predictions or decisions without being explicitly programmed.

**Supervised vs Unsupervised Learning:**

| | Supervised | Unsupervised |
|---|---|---|
| **Goal** | Predict target variable | Find hidden patterns |
| **Data** | Labelled (X, y) | Unlabelled (X only) |
| **Examples** | Regression, classification | Clustering, dimensionality reduction |
| **Evaluation** | Accuracy, RMSE, F1 | Silhouette score, inertia |

**Common ML Algorithms for Business:**

| Algorithm | Type | Use Case |
|-----------|------|----------|
| **Linear Regression** | Supervised | Continuous prediction (sales, demand) |
| **Logistic Regression** | Supervised | Binary classification (churn, default) |
| **Decision Trees** | Supervised | Interpretable rules, segmentation |
| **Random Forest** | Supervised | High accuracy, handles non-linearity |
| **K-Means** | Unsupervised | Customer segmentation |
| **PCA** | Unsupervised | Dimensionality reduction |

**Logistic Regression:**
Models probability of binary outcome:
$$P(Y=1|X) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 X_1 + ... + \beta_k X_k)}}$$

**Odds ratio:** $e^{\beta_j}$ = change in odds for one-unit increase in $X_j$

**Overfitting vs Underfitting:**
- **Underfitting:** Model too simple; high bias, low variance
- **Overfitting:** Model too complex; low bias, high variance
- **Solution:** Cross-validation, regularisation (LASSO, Ridge), simpler models

**Bias-Variance Tradeoff:**
$$\text{Expected Test Error} = \text{Bias}^2 + \text{Variance} + \text{Irreducible Error}$$

**Cross-Validation:**
- **k-fold:** Divide data into k folds; train on k-1, test on 1; average performance
- **Leave-one-out:** Special case where k = n
- **Purpose:** Estimate out-of-sample performance, tune hyperparameters

---

### Exam Focus: Business Analytics & Econometrics

**High-Yield Topics:**
- Interpreting OLS coefficients (ceteris paribus)
- Conducting t-tests and constructing confidence intervals
- F-test for overall model significance
- Testing CLRM assumptions and knowing consequences
- Distinguishing correlation vs causation
- Choosing appropriate causal inference method
- A/B test design, sample size, and interpretation
- Calculating business metrics (CAC, ROI, conversion, CLV)
- Time series stationarity and unit root tests
- Dummy variable interpretation and trap avoidance

**Common Exam Traps:**
- Forgetting coefficients are marginal effects holding other variables constant
- Confusing statistical significance with economic significance
- Ignoring heteroskedasticity in cross-sectional data
- Running regressions with non-stationary time series (spurious regression)
- Assuming randomisation in observational studies
- Including all dummy categories + intercept (dummy variable trap)
- Using R² instead of adjusted R² to compare models with different numbers of predictors
- Interpreting log-log coefficients as absolute rather than percentage changes

**Key Formulas:**
- OLS slope: $\hat{\beta}_1 = \frac{\text{Cov}(X,Y)}{\text{Var}(X)}$
- $R^2 = 1 - \frac{SSR}{SST}$
- Adjusted $R^2 = 1 - \frac{SSR/(n-k-1)}{SST/(n-1)}$
- t-statistic: $t = \frac{\hat{\beta}}{SE(\hat{\beta})}$
- F-statistic: $F = \frac{(SST-SSR)/k}{SSR/(n-k-1)}$
- DiD: $(\Delta \text{Treated}) - (\Delta \text{Control})$
- Standard error: $SE(\bar{X}) = \frac{\sigma}{\sqrt{n}}$
- Confidence interval: $\hat{\beta} \pm t_{\alpha/2} \cdot SE(\hat{\beta})$

**Regression Output Checklist:**
When interpreting regression output, check:
1. ✅ Sign and magnitude of coefficients
2. ✅ Statistical significance (p-values < 0.05?)
3. ✅ Economic significance (practical importance)
4. ✅ Overall model fit (R², F-test)
5. ✅ Sample size
6. ✅ CLRM assumptions (diagnostics)
7. ✅ Causality claims (is design causal or correlational?)

**Practice Problem: Full Regression Analysis**
> Given output:
> 
> | Variable | Coefficient | Std Error | t-stat | p-value |
> |----------|-------------|-----------|--------|---------|
> | Intercept | 5.2 | 2.1 | 2.48 | 0.015 |
> | Price | -1.8 | 0.4 | -4.50 | <0.001 |
> | Advertising | 2.5 | 0.8 | 3.13 | 0.002 |
> | Competitor Price | 0.9 | 0.5 | 1.80 | 0.075 |
> 
> $n = 100$, $R^2 = 0.65$, Adjusted $R^2 = 0.64$
> 
> **Questions:**
> 1. Interpret each coefficient (ceteris paribus)
> 2. Which variables are significant at 5%? At 10%?
> 3. Calculate the F-statistic for overall significance
> 4. A 10% price increase leads to what change in sales (log-log model)?
> 5. What concerns might you have about endogeneity?
> 
> **Answers:**
> 1. Price: -1.8 (each $1 price increase reduces sales by 1.8 units, holding ads and competitor price constant). Advertising: +2.5 (each $1 increase in ads increases sales by 2.5 units). Competitor price: +0.9 (each $1 increase in competitor price increases sales by 0.9 units — substitution effect).
> 2. At 5%: Price and Advertising (p < 0.05). At 10%: All three (p < 0.10).
> 3. $F = \frac{0.65/3}{(1-0.65)/(100-4)} = \frac{0.2167}{0.003646} = 59.4$ → Highly significant.
> 4. If log-log: coefficient = elasticity. 10% price increase → −1.8 × 10% = 18% sales decrease.
> 5. Price may be endogenous (firms set prices based on expected demand). IV or natural experiment needed for causal claims.
