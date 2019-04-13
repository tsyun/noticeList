<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>IoCare 공지사항</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark @click="expand = !expand">
        {{ expand ? 'Close' : 'Keep' }} other rows
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="list"
      :expand="expand"
      item-key="id"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.country_code | countryName }}</td>
          <td>{{ props.item.app_key | appName }}</td>
          <td>{{ props.item.show_yn }}</td>
          <td>{{ props.item.skip_yn }}</td>
          <td>{{ props.item.start_date | dateFormat }}</td>
          <td>{{ props.item.end_date | dateFormat }}</td>
          <td>{{ props.item.reg_date || dateFormat }}</td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-text v-html="replaceTag(props.item.contents)"></v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import moment from "moment";

const toLower = text => {
  return text.toString().toLowerCase();
};
const toUpper = text => {
  return text.toString().toUpperCase();
};

const searchByText = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.app_key).includes(toLower(term)));
  }

  return items;
};

  export default {
    data () {
      return {
        expand: false,
        headers: [
          {
            text: 'No',
            align: 'center',
            sortable: true,
            value: 'id'
          },
          {
            text: '제목',
            align: 'center',
            sortable: true,
            value: 'title'
          },
          {
            text: '적용국가',
            align: 'center',
            sortable: true,
            value: 'country_code'
          },
          {
            text: '적용앱',
            align: 'center',
            sortable: true,
            value: 'app_key'
          },
          {
            text: '팝업표시',
            align: 'center',
            sortable: true,
            value: 'show_yn'
          },
          {
            text: '앱사용가능',
            align: 'center',
            sortable: true,
            value: 'skip_yn'
          },
          {
            text: '시작시간',
            align: 'center',
            sortable: true,
            value: 'start_date'
          },
          {
            text: '종료시간',
            align: 'center',
            sortable: true,
            value: 'end_date'
          },
          {
            text: '등록시간',
            align: 'center',
            sortable: true,
            value: 'reg_date'
          }
        ],
        list: [
            {
                "app_key" : "COIOIOP1",
                "country_code" : "US",
                "title" : "[IoCare 서버 점검 공지 드립니다.]",
                "contents" : "IoCare 서버 점검에 대한 내용을 아래와 같이 공지드립니다.\r\n\r\n1. 점검 일시 : 4\/13(토) 23:00 ~ 14(일) 08:00 (9시간)\r\n2. 점검 내용 : 서버 정기점검 및 안정화 개선 작업\r\n3. 점검 영향 : 새로운 제품 등록 불가, Home, 레포트, 기기관리 메뉴 일부 기능 사용 불가\r\n\r\n당 점검 시간 동안 일부 기능 사용 불가함에 널리 양해하여 주시기 바랍니다.\r\n점검을 통해 보다 좋은 서비스를 제공하도록 하겠습니다.\r\n\r\n감사합니다\r\n\r\n•제품 및 서비스 문의 : 웅진코웨이 고객센터 1588-5200",
                "show_yn" : "N",
                "start_date" : "20190413230000",
                "end_date" : "20190414080000",
                "skip_yn" : "Y",
                "id" : 8,
                "reg_date" : "2019-04-08T02:20:11Z"
            },
            {
                "app_key" : "COIOIOP1",
                "country_code" : "KR",
                "title" : "[IoCare 서버 점검 공지 드립니다.]",
                "contents" : "IoCare 서버 점검에 대한 내용을 아래와 같이 공지드립니다.\r\n\r\n1. 점검 일시 : 4\/13(토) 23:00 ~ 14(일) 08:00 (9시간)\r\n2. 점검 내용 : 서버 정기점검 및 안정화 개선 작업\r\n3. 점검 영향 : 새로운 제품 등록 불가, Home, 레포트, 기기관리 메뉴 일부 기능 사용 불가\r\n\r\n당 점검 시간 동안 일부 기능 사용 불가함에 널리 양해하여 주시기 바랍니다.\r\n점검을 통해 보다 좋은 서비스를 제공하도록 하겠습니다.\r\n\r\n감사합니다\r\n\r\n•제품 및 서비스 문의 : 웅진코웨이 고객센터 1588-5200",
                "show_yn" : "Y",
                "start_date" : "20190408115000",
                "end_date" : "20190410170000",
                "skip_yn" : "Y",
                "id" : 7,
                "reg_date" : "2019-04-08T02:20:11Z"
            },
            {
                "app_key" : "COIOIOP0",
                "country_code" : "US",
                "title" : "[IoCare 서버 점검 공지 드립니다.]",
                "contents" : "IoCare 서버 점검에 대한 내용을 아래와 같이 공지드립니다.\r\n\r\n1. 점검 일시 : 4\/13(토) 23:00 ~ 14(일) 08:00 (9시간)\r\n2. 점검 내용 : 서버 정기점검 및 안정화 개선 작업\r\n3. 점검 영향 : 새로운 제품 등록 불가, Home, 레포트, 기기관리 메뉴 일부 기능 사용 불가\r\n\r\n당 점검 시간 동안 일부 기능 사용 불가함에 널리 양해하여 주시기 바랍니다.\r\n점검을 통해 보다 좋은 서비스를 제공하도록 하겠습니다.\r\n\r\n감사합니다\r\n\r\n•제품 및 서비스 문의 : 웅진코웨이 고객센터 1588-5200",
                "show_yn" : "N",
                "start_date" : "20190413230000",
                "end_date" : "20190414080000",
                "skip_yn" : "Y",
                "id" : 6,
                "reg_date" : "2019-04-08T02:20:07Z"
            },
            {
                "app_key" : "COIOIOP0",
                "country_code" : "KR",
                "title" : "[IoCare 서버 점검 공지 드립니다.]",
                "contents" : "IoCare 서버 점검에 대한 내용을 아래와 같이 공지드립니다.\r\n\r\n1. 점검 일시 : 4\/13(토) 23:00 ~ 14(일) 08:00 (9시간)\r\n2. 점검 내용 : 서버 정기점검 및 안정화 개선 작업\r\n3. 점검 영향 : 새로운 제품 등록 불가, Home, 레포트, 기기관리 메뉴 일부 기능 사용 불가\r\n\r\n당 점검 시간 동안 일부 기능 사용 불가함에 널리 양해하여 주시기 바랍니다.\r\n점검을 통해 보다 좋은 서비스를 제공하도록 하겠습니다.\r\n\r\n감사합니다\r\n\r\n•제품 및 서비스 문의 : 웅진코웨이 고객센터 1588-5200",
                "show_yn" : "N",
                "start_date" : "20190413230000",
                "end_date" : "20190414080000",
                "skip_yn" : "Y",
                "id" : 5,
                "reg_date" : "2019-04-08T02:19:58Z"
            },
            {
                "app_key" : "COIOANP1",
                "country_code" : "US",
                "title" : "[IoCare 서버 점검 공지 드립니다.]",
                "contents" : "IoCare 서버 점검에 대한 내용을 아래와 같이 공지드립니다.\r\n\r\n1. 점검 일시 : 4\/13(토) 23:00 ~ 14(일) 08:00 (9시간)\r\n2. 점검 내용 : 서버 정기점검 및 안정화 개선 작업\r\n3. 점검 영향 : 새로운 제품 등록 불가, Home, 레포트, 기기관리 메뉴 일부 기능 사용 불가\r\n\r\n당 점검 시간 동안 일부 기능 사용 불가함에 널리 양해하여 주시기 바랍니다.\r\n점검을 통해 보다 좋은 서비스를 제공하도록 하겠습니다.\r\n\r\n감사합니다\r\n\r\n•제품 및 서비스 문의 : 웅진코웨이 고객센터 1588-5200",
                "show_yn" : "N",
                "start_date" : "20190413230000",
                "end_date" : "20190414080000",
                "skip_yn" : "Y",
                "id" : 4,
                "reg_date" : "2019-04-08T02:19:22Z"
            },
            {
                "app_key" : "COIOANP1",
                "country_code" : "KR",
                "title" : "[IoCare 서버 점검 공지 드립니다.]",
                "contents" : "IoCare 서버 점검에 대한 내용을 아래와 같이 공지드립니다.\r\n\r\n1. 점검 일시 : 4\/13(토) 23:00 ~ 14(일) 08:00 (9시간)\r\n2. 점검 내용 : 서버 정기점검 및 안정화 개선 작업\r\n3. 점검 영향 : 새로운 제품 등록 불가, Home, 레포트, 기기관리 메뉴 일부 기능 사용 불가\r\n\r\n당 점검 시간 동안 일부 기능 사용 불가함에 널리 양해하여 주시기 바랍니다.\r\n점검을 통해 보다 좋은 서비스를 제공하도록 하겠습니다.\r\n\r\n감사합니다\r\n\r\n•제품 및 서비스 문의 : 웅진코웨이 고객센터 1588-5200",
                "show_yn" : "Y",
                "start_date" : "20190408115000",
                "end_date" : "20190410170000",
                "skip_yn" : "Y",
                "id" : 3,
                "reg_date" : "2019-04-08T02:19:17Z"
            },
            {
                "app_key" : "COIOANP0",
                "country_code" : "US",
                "title" : "[IoCare 서버 점검 공지 드립니다.]",
                "contents" : "IoCare 서버 점검에 대한 내용을 아래와 같이 공지드립니다.\r\n\r\n1. 점검 일시 : 4\/13(토) 23:00 ~ 14(일) 08:00 (9시간)\r\n2. 점검 내용 : 서버 정기점검 및 안정화 개선 작업\r\n3. 점검 영향 : 새로운 제품 등록 불가, Home, 레포트, 기기관리 메뉴 일부 기능 사용 불가\r\n\r\n당 점검 시간 동안 일부 기능 사용 불가함에 널리 양해하여 주시기 바랍니다.\r\n점검을 통해 보다 좋은 서비스를 제공하도록 하겠습니다.\r\n\r\n감사합니다\r\n\r\n•제품 및 서비스 문의 : 웅진코웨이 고객센터 1588-5200",
                "show_yn" : "N",
                "start_date" : "20190413230000",
                "end_date" : "20190414080000",
                "skip_yn" : "Y",
                "id" : 2,
                "reg_date" : "2019-04-08T02:19:09Z"
            },
            {
                "app_key" : "COIOANP0",
                "country_code" : "KR",
                "title" : "[IoCare 서버 점검 공지 드립니다.]",
                "contents" : "IoCare 서버 점검에 대한 내용을 아래와 같이 공지드립니다.\r\n\r\n1. 점검 일시 : 4\/13(토) 23:00 ~ 14(일) 08:00 (9시간)\r\n2. 점검 내용 : 서버 정기점검 및 안정화 개선 작업\r\n3. 점검 영향 : 새로운 제품 등록 불가, Home, 레포트, 기기관리 메뉴 일부 기능 사용 불가\r\n\r\n당 점검 시간 동안 일부 기능 사용 불가함에 널리 양해하여 주시기 바랍니다.\r\n점검을 통해 보다 좋은 서비스를 제공하도록 하겠습니다.\r\n\r\n감사합니다\r\n\r\n•제품 및 서비스 문의 : 웅진코웨이 고객센터 1588-5200",
                "show_yn" : "N",
                "start_date" : "20190413230000",
                "end_date" : "20190414080000",
                "skip_yn" : "Y",
                "id" : 1,
                "reg_date" : "2019-04-08T02:18:56Z"
            }
        ],
      }
    },
    methods: {
        replaceTag(text) {
            return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
    },
    filters: {
        dateFormat: function (date) {
            // return moment(String(date)).format('YYYY-MM-DD HH:mm');
            return moment(date, 'YYYY[-]MM[-]DD').format();
        },
        countryName(countryCode) {
            var countryName = "";
            switch(toUpper(countryCode)) {
                case "KR": countryName = "대한민국"; break;
                case "US": countryName = "미국"; break;
                case "IT": countryName = "이탈리아"; break;
                case "DE": countryName = "독일"; break;
            }
            return countryName;
        },
        appName(appKey) {
            var appName = "";
            switch(appKey) {
                case "COIOANP0": appName = "AOS 개발"; break;
                case "COIOIOP0": appName = "iOS 개발"; break;
                case "COIOANP1": appName = "AOS 검증"; break;
                case "COIOIOP1": appName = "iOS 검증"; break;
                case "COIFANP1": appName = "AOS US_TEST"; break;
                case "COIFIOP1": appName = "iOS US_TEST"; break;
            }
            return appName;
        }
    }
  }
</script>