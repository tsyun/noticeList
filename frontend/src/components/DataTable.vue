<!-- 공지 리스트 데이터 테이블 -->
<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>IoCare 공지사항</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- full screen dialog 영역 -->
      <template>
        <div>
          <v-btn color="primary" dark @click="handleClickButton">
            등록
          </v-btn>
          <regist-notice title="IoCare 공지 등록" :dialog.sync="dialog">
            <div>
              This is Regist IoCare Notice...
            </div>
          </regist-notice>
        </div>
      </template>
      <!-- full screen dialog 영역 -->
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="list"
      :expand="expand"
      :loading="progress"
      item-key="id"
    >
      <template v-slot:loading="props">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </template>
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
import registNotice from "./RegistNotice";

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
    created() {
      this.initialize();
    },
    data () {
      return {
        dialog: false,
        expand: false,
        progress: true,
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
        list: []
      }
    },
    components: {
      registNotice: registNotice
    },
    methods: {
        initialize() {  // 초기화
          this.getNoticeList();
        },
        replaceTag(text) {  // \r,\n 문자를 <br /> 태그로 치환
            return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        },
        getNoticeList() { // 공지 리스트 조회
          this.$http.get('/api/notice')
          .then((response) => {
            this.list = response.data 
          })
        },
        handleClickButton() { // 등록 버튼 클릭
          this.dialog = !this.dialog
        }
    },
    filters: {
        dateFormat: function (date) {
            // return moment(String(date)).format('YYYY-MM-DD HH:mm');
            return moment(date, 'YYYY-MM-DD HH:mm:ss').format();
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
                case "COIOANP0": appName = "AOS DEV"; break;
                case "COIOIOP0": appName = "iOS DEV"; break;
                case "COIOANP1": appName = "AOS STG"; break;
                case "COIOIOP1": appName = "iOS STG"; break;
                case "COIFANP1": appName = "AOS US_TEST"; break;
                case "COIFIOP1": appName = "iOS US_TEST"; break;
            }
            return appName;
        }
    }
  }
</script>