<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">IoCare 공지사항</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search" v-model="search" @input="searchOnTable"/>
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No list found"
        :md-description="`No list found for this '${search}' query. Try a different search term or create a new notice.`"
      >
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="detailNotice(item)">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="제목" md-sort-by="title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="적용국가" md-sort-by="country_code">{{ item.country_code | countryName }}</md-table-cell>
        <md-table-cell md-label="적용앱" md-sort-by="app_key">{{ item.app_key | appName }}</md-table-cell>
        <md-table-cell md-label="팝업표시" md-sort-by="show_yn">{{ item.show_yn }}</md-table-cell>
        <md-table-cell md-label="앱사용가능" md-sort-by="skip_yn">{{ item.skip_yn }}</md-table-cell>
        <md-table-cell md-label="시작시간" md-sort-by="start_date">{{ item.start_date }}</md-table-cell>
        <md-table-cell md-label="종료시간" md-sort-by="end_date">{{ item.end_date }}</md-table-cell>
        <md-table-cell md-label="등록시간" md-sort-by="reg_date">{{ item.reg_date }}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-button class="md-primary md-raised" @click="writingNotice">등록</md-button>
  </div>
</template>

<script>
// import noticeList from "../../assets/testData/noticeList.json";
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
  name: "TableSearch",
  data: () => ({
    search: null,
    searched: [],
    // list: noticeList
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
    ]
  }),
  methods: {
    newUser() {
      this.writingNotice();
    },
    searchOnTable() {
      this.searched = searchByText(this.list, this.search);
    },
    writingNotice() {
      this.$router.push("/notice/writing");
    },
    detailNotice(data) {
      // e.preventDefault();
      // alert("data => " + JSON.stringify(data));
      this.$router.push({ name: "noticeWriting", params: data });
    }
  },
  filters: {
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
    }
  },
  created() {
    this.searched = this.list;
  }
};
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
md-table-head {
  text-align: center;
}
small {
  display: block;
}
</style>
