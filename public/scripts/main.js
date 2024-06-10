// const { default: axios } = require('axios');

const showLoading = (message = 'กำลังดึงข้อมูล') => {
  $('#loading-text').text(message);
  $('#loading-overlay').removeClass('hidden');
};

const hideLoading = () => $('#loading-overlay').addClass('hidden');

var flexmonster = new Flexmonster({
  container: 'pivot-container',
  toolbar: true,
  beforetoolbarcreated: toolbar => {
    const tabs = toolbar.getTabs();
    toolbar.getTabs = () => {
      [...tabs].forEach(tab => {
        if (['fm-tab-connect', 'fm-tab-open'].includes(tab.id))
          tabs.splice(
            tabs.findIndex(e => e.id === tab.id),
            1,
          );
        if ('fm-tab-save' == tab.id) {
          tab.handler = onClickSave;
          const saveIndex = tabs.findIndex(e => e.id == 'fm-tab-save');
          tabs[saveIndex] = tab;
          if (false && session.pivot && session.pivot.pivot_config) {
            tabs.splice(saveIndex, 1);
          }
        }
      });
      return tabs;
    };
  },
  // aftergriddraw: afterDrawEvent,
  height: window.innerHeight - window.innerHeight * 0.08,
  global: {
    localization: '/flexmonster/loc/th.json',
  },
  report: {
    slice: {},
    conditions: [],
    formats: [],
  },
  licenseKey: 'Z7E7-13521L-2W5S1R-0H2O6U-6T130Y-0G2K1N-4R2X6V-526D6E-1A151L-6F3B37-3B4S35-4F1U6S-522X6D-310W1L-5R6361-463R',
});

const onClickSave = async () => {
  const config = flexmonster.getReport();
  console.log(config);

  const { slice, conditions, formats, options, creationDate, version } = config;
  showLoading('กำลังบันทึก Pivot...');
  const response = await axios({
    url: `${baseUrl}/pivot/${session.session_key}`,
    method: 'put',
    data: {
      slice: slice,
      conditions: conditions,
      formats: formats,
      options: options,
      creationDate: creationDate,
      version: version,
    },
  });
  if (response.status === 202) {
    swal({
      title: 'แจ้งเตือน!',
      text: 'บันทึกข้อมูลสำเร็จ',
      icon: 'success',
    });
  }
  hideLoading();
};

const fetchData = async () => {
  const { pivot } = session;
  const response = await axios({
    method: pivot.endpoint_method,
    data: pivot.endpoint_payloads ?? null,
    headers: pivot.endpoint_headers ?? null,
    url: pivot.endpoint_url,
  });

  return response;
};

fetchData()
  .then(response => {
    if (response.status === 200) {
      console.log('fetch done!');
      if (session.pivot && session.pivot.pivot_config) {
        flexmonster.setReport({
          ...session.pivot.pivot_config,
          dataSource: {
            type: 'json',
            data: session.pivot.endpoint_response_mapper ? eval(`response.data.${session.pivot.endpoint_response_mapper}`) : response.data,
          },
        });
      } else {
        flexmonster.setReport({
          dataSource: {
            type: 'json',
            data: session.pivot.endpoint_response_mapper ? eval(`response.data.${session.pivot.endpoint_response_mapper}`) : response.data,
          },
        });
      }
    }
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    hideLoading();
    $('#title').text(`${session.pivot.pivot_name}`.toUpperCase());
  });
