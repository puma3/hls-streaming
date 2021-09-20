# HLS Stream

Profiler for HLS video playback.

## Features

- Video Controls:
  - Switch video input
  - Switch video size
  - Display/Hide stats

- Stats:
  - Start Time (since page creation)
  - Heap Size (Memory usage: Run Chrome with `--enable-precise-memory-info`)
  - Dimensions (Not working for Video.js)

## Execution

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# test the production build locally
npm run serve
```

![image](https://user-images.githubusercontent.com/1296892/134020191-dc3dc992-b5cc-491a-9edb-f4cc3d884d3c.png)

![image](https://user-images.githubusercontent.com/1296892/134020299-3ffc6c1f-53b7-4f2d-8df6-805baace022e.png)

## Objective

Finding the best library for HLS video streaming:

- Ability to playback HLS streams
- Memory usage (e.g. within Javascript Heap and/or DOM)
- First Video start time after app loads
- Video switch time
- Efficient CPU usage

## Results

The following results were obtained using a production build of the App (`npm run serve`).

### Memory Usage (using App's memory watcher)

- First load memory footprint

| #Test | HLS.js (MB) | Video.js (MB) |
|-------|-------------|---------------|
| 1     | 46.83       | 6.61         |
| 2     | 58.55       | 6.04         |
| 3     | 37.19       | 6.02         |
| 4     | 55.15       | 9.62         |
| 5     | 32.71       | 9.71         |
| Avg   | 46.09       | **7.6**      |

- 15 Seconds of playback memory footprint

| #Test | HLS.js (MB) | Video.js (MB) |
|-------|-------------|---------------|
| 1     | 45.33       | 17.52         |
| 2     | 35.32       | 15.54         |
| 3     | 77.25       | 16.59         |
| 4     | 46.24       | 16.73         |
| 5     | 38.02       | 15.18         |
| Avg   | 48.43       | **16.31**     |

- 30 Seconds of playback memory footprint

| #Test | HLS.js (MB) | Video.js (MB) |
|-------|-------------|---------------|
| 1     | 6.73        | 40.59         |
| 2     | 6.50        | 38.49         |
| 3     | 6.53        | 38.73         |
| 4     | 6.81        | 38.98         |
| 5     | 6.54        | 40.85         |
| Avg   | **6.62**    | 39.53         |

- Source switch memory footprint (after 15 seconds of playback for each video)

| #Test | HLS.js (MB) | Video.js (MB) |
|-------|-------------|---------------|
| 1     | 24.73       | 11.58          |
| 2     | 36.16       | 16.65         |
| 3     | 42.47       | 11.42         |
| 4     | 34.14       | 14.79         |
| 5     | 31.42       | 16.19         |
| Avg   | 33.78       | **14.13**     |

#### HLS.js Heap size example using Chrome Tools
![image](https://user-images.githubusercontent.com/1296892/134017261-53ecb659-7929-4f43-8821-75f275770673.png)

#### Video.js Heap size example using Chrome Tools
![image](https://user-images.githubusercontent.com/1296892/134017155-c3620385-dbc7-4784-9a2a-0109ee2ed5cc.png)

### First Video start time after app loads

| #Test | HLS.js (ms) | Video.js (ms) |
|-------|-------------|---------------|
| 1     | 94.60       | 92.20         |
| 2     | 70.50       | 69.80         |
| 3     | 123.10      | 104.60        |
| 4     | 91.50       | 72.10         |
| 5     | 72.10       | 92.80         |
| Avg   | 90.36       | **86.3**      |

### Video switch time

Missing implementation, couldn't test.

### Efficient CPU usage (Using Chrome's developer tools)

- Scripting time

| #Test | HLS.js (ms) | Video.js (ms) |
|-------|-------------|---------------|
| 1     | 981         | 447           |
| 2     | 1032        | 456           |
| 3     | 882         | 446           |
| 4     | 936         | 444           |
| 5     | 1000        | 468           |
| Avg   | 966.20      | **452.20**    |

- Rendering time

| #Test | HLS.js (ms) | Video.js (ms) |
|-------|-------------|---------------|
| 1     | 76          | 41            |
| 2     | 51          | 40            |
| 3     | 47          | 38            |
| 4     | 62          | 39            |
| 5     | 60          | 43            |
| Avg   | 59.20       | **40.20**     |

## Conclusions

Overall Video.js had the best measurements for most of the cases tested (HLS.js only surpassed it on one test). However it must be noted that memory usage for Video.js grows as the playback time increases too, reaching a ceiling around 30 seconds and then reducing the memory footprint. This seems to be the opposite for HLS.js as the heap size decreases in size as the playback continues. Switching the video source for any of them seem to be inmediate (couldn't implement a profiler for this test).

In terms of initial memory usage, video start time and CPU utilization Video.js is a better option over HLS.js.
