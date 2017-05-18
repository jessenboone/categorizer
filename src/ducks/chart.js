const CREATE_CHART = "CREATE_CHART";
const SET_ACTIVE_CHART_INDEX = "SET_ACTIVE_CHART_INDEX";
const ADD_DATASET = "ADD_DATASET";

const initialState = {
  activeChartIndex: 0,
  charts: [
    {
      labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ],
      name: "Example Chart",
      datasets: [
        {
          label: "My First dataset",
          data: [100, 60, 100, 40, 100, 60, 100]
        },
        {
          label: "My Second dataset",
          data: [40, 100, 60, 100, 60, 100, 40]
        }
      ]
    }
  ]
};

export default function chart( state = initialState, action ) {
  switch(action.type) {
    case CREATE_CHART:
      return {
        activeChartIndex: 0,
        charts: [ action.chart, ...state.charts ]
      };
    case SET_ACTIVE_CHART_INDEX:
      return {
        activeChartIndex: action.index,
        charts: state.charts
      }
    case ADD_DATASET: {
      const { activeChartIndex, charts } = state;
      const activeChart = charts[ activeChartIndex ];
      return {
          activeChartIndex,
          charts: [
            ...charts.slice( 0, activeChartIndex ),
            Object.assign({}, activeChart, { datasets: [ ...activeChart.datasets, action.dataset ] }),
            ...charts.slice( activeChartIndex + 1, charts.length )
        ]
      }
    }
    default:
      return state;
  }
}

export function createChart(labels, name) {
  return {
    chart: { labels, name, datasets: [] },
    type: CREATE_CHART
  };
}

export function setActiveChartIndex(index) {
  return {
    index,
    type: SET_ACTIVE_CHART_INDEX
  }
}

export function addDataset(dataset) {
  return {
    dataset,
    type: ADD_DATASET
  }
}
