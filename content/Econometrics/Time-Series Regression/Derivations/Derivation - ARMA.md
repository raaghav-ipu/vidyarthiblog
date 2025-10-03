---
title: Derivation - ARMA
description: Derive and discuss the stationarity restrictions for an ARMA(1,1) process.
date: 2025-10-03
draft: false
tags:
  - econometrics
categories:
  - Economics
pinned: false
author: Raaghav Bhardwaj
---
#### **1. ARMA(1,1) Model Definition**

The ARMA(1,1) process is given by:

$$
y_t = a_1 y_{t-1} + \epsilon_t + \theta_1 \epsilon_{t-1}
$$

where $\epsilon_t$ is a white noise process (mean zero, constant variance, uncorrelated over time).

***
#### **2. Stationarity Condition: AR Part**

- The process is stationary if the mean, variance, and autocovariances do not depend on time.
- The key restriction comes from the autoregressive (AR) part:
    - The characteristic equation is $1 - a_1 L = 0$, where $L$ is the lag operator.
    - The root is $L = 1/a_1$.
    - **Stationarity requires:**

$$
|a_1| < 1
$$
- If $|a_1| \geq 1$, the process is nonstationary: the mean and variance can grow over time.

***
#### **3. MA Part: Invertibility**

- The moving average (MA) part does not affect stationarity, but it does affect invertibility (whether the process can be written as an infinite AR process).
- **Invertibility restriction:**

$$
|\theta_1| < 1
$$
- This ensures the MA part can be expressed as a convergent AR(∞) process.

***
#### **4. Combined ARMA(1,1) Stationarity**

- **Summary:**
    - The ARMA(1,1) process is stationary if and only if:
        - $|a_1| < 1$
        - The MA parameter $\theta_1$ can take any value for stationarity, but invertibility requires $|\theta_1| < 1$.
- If these conditions hold, the mean, variance, and autocovariances of $y_t$ are finite and do not depend on time.

***
#### **5. Interpretation**

- **Why is $|a_1| < 1$ required?**
    - If $|a_1| \geq 1$, shocks to the process persist or grow, so the process does not settle to a constant mean/variance.
- **MA part:**
    - The MA term only affects the short-run dynamics, not the long-run stationarity.
- **Box-Jenkins methodology:**
    - When fitting ARMA models, always check the AR roots for stationarity and the MA roots for invertibility.

***
**In summary:**

- For an ARMA(1,1) process, stationarity requires $|a_1| < 1$.
- Invertibility requires $|\theta_1| < 1$.
- These restrictions ensure the process is well-behaved and suitable for time series analysis.
