---
title: Derivation - ACF and PACF
description: Derive and interpret the ACF and PACF functions for the AR(1) and MA(1) process.
date: 2025-10-03
draft: false
tags:
  - econometrics
categories:
  - Economics
pinned: false
author: Raaghav Bhardwaj
---

### 1. **AR(1) Process**

The AR(1) model is:

$$
y_t = a_1 y_{t-1} + \epsilon_t
$$

where $\epsilon_t$ is white noise.

#### **Autocorrelation Function (ACF) Derivation**

- The autocovariance at lag $k$ is:

$$
\gamma_k = E[(y_t - \mu)(y_{t-k} - \mu)]
$$
- For AR(1), the autocorrelation at lag $k$ is:

$$
\rho_k = a_1^k
$$

This means the ACF decays **geometrically** with lag $k$. If $a_1 > 0$, the decay is monotonic; if $a_1 < 0$, the ACF oscillates in sign but still decays in magnitude.


#### **Partial Autocorrelation Function (PACF) Derivation**

- The PACF at lag 1 is simply $a_1$.
- For lags greater than 1, the PACF is zero:

$$
\text{PACF}(k) = 0 \quad \text{for} \quad k > 1
$$
- **Interpretation:** The PACF for AR(1) shows a single spike at lag 1 and then cuts off to zero, which helps identify the order of the AR process.

***

### 2. **MA(1) Process**

The MA(1) model is:

$$
y_t = \epsilon_t + \theta_1 \epsilon_{t-1}
$$

where $\epsilon_t$ is white noise.

#### **Autocorrelation Function (ACF) Derivation**

- The autocorrelation at lag 0 is always 1.
- At lag 1:

$$
\rho_1 = \frac{\theta_1}{1 + \theta_1^2}
$$
- For lags greater than 1, the autocorrelation is zero:

$$
\rho_k = 0 \quad \text{for} \quad k > 1
$$
- **Interpretation:** The ACF for MA(1) shows a spike at lag 1 and then cuts off to zero, which is a key identifying feature.


#### **Partial Autocorrelation Function (PACF) Derivation**

- The PACF for MA(1) decays **geometrically** with lag, similar to the ACF of AR(1):
    - The first lag is not a spike, but subsequent lags decay.
- **Interpretation:** The PACF for MA(1) does not cut off after lag 1, but instead decays, which helps distinguish it from AR(1).

***

### **Summary Table**

| Process | ACF Pattern | PACF Pattern |
| :-- | :-- | :-- |
| AR(1) | Geometric decay | Spike at lag 1, then zero |
| MA(1) | Spike at lag 1, then zero | Geometric decay |

**Box-Jenkins model identification uses these patterns to distinguish AR and MA processes.**

