<template>
  <div>
    <v-layout row wrap mt-3 ml-3>
      <v-spacer></v-spacer>
      <select v-model="type" class="custom-select">
        <option v-for="option in items" v-bind:value="option.value" :key="option.id">{{ option.text }}</option>
      </select>
    </v-layout>
    <template>
      <v-card class="elevation-3">
        <v-card-title>
          Theo dõi tài khoản GoogleAds
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog4" persistent max-width="900px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Change</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Change</v-card-title>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Id</th>
                    <th class="text-left">Key</th>
                    <th class="text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts4" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                    <td>{{ item.value}}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog4 = false">
                  Disagree
                </v-btn>
                <v-btn color="green darken-1" text @click="dialog4 = false">
                  Agree
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" large v-on="on">contact_support</v-icon>
            </template>
            <span style="color:white">Kí hiệu</span>
            <br />
            <v-icon color="green">fiber_manual_record</v-icon>Bình thường
            <br />
            <v-icon color="red">fiber_manual_record</v-icon>Cảnh báo
          </v-tooltip>
        </v-card-title>
        <template>
          <template>
            <v-simple-table class="table">
              <thead>
                <tr>
                  <th class="black--text" style="font-size:15px" v-for="(apple, index) in header" :key="index">
                    {{apple.text}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in desserts" :key="item.id">
                  <td>{{i+1}}</td>
                  <td>{{ item.customerId }}</td>
                  <td>{{ item.customerDescriptiveName }}</td>
                  <td v-for="(detail,ki) in item.trackingDetail" :key="ki">
                    <v-tooltip bottom dark>
                      <template v-slot:activator="{ on }">
                        <v-icon :color="getColor(detail.isWarning)" large v-on="on">fiber_manual_record</v-icon>
                      </template>
                      <span>Giá trị cũ: {{formatNumber(detail.previousValue)}}</span>
                      <br />
                      <span :color="getColor1(detail.changeValue)">
                        <v-icon :color="getColor1(detail.changeValue)">{{getIcon(detail.changeValue)}}</v-icon>
                        {{formatNumber(detail.changeValue)}}%
                      </span>
                    </v-tooltip>
                    {{formatNumber(detail.currentValue)}} {{getCurrency(detail.type,item.currency)}}
                    {{getPercent(detail.type)}}
                  </td>
                  <!-- Quảng cáo bị từ chối -->
                  <td>
                    <v-dialog v-model="dialog1" width="1000">
                      <template v-slot:activator="{ on }">
                        <v-btn text v-on="on" @click="getApi1(item.customerId)">
                          <v-icon large :color="getColor2(item.numOfDisapprovedAds)">fiber_manual_record</v-icon>
                          {{item.numOfDisapprovedAds}}
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="blue white--text" primary-title>Quảng cáo bị từ chối</v-card-title>
                        <v-card-text>
                          <v-simple-table>
                            <thead>
                              <tr style="color:blue; font-size: 20px;">
                                <td width="50px">#</td>
                                <td>Tên Campain</td>
                                <td>Tên nhóm quảng cáo</td>
                                <td>Mẫu quảng cáo</td>
                              </tr>
                            </thead>
              <tbody>
                <tr v-for="(item, a) in desserts2" :key="item.id">
                  <td>{{a+1}}</td>
                  <td>{{item.campaignName}}</td>
                  <td>{{item.adGroupName}}</td>
                  <td>{{item.adName}}</td>
                </tr>
              </tbody>
            </v-simple-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog1 = false">Cancel</v-btn>
            </v-card-actions>
      </v-card>
      </v-dialog>
      </td>
      <!-- AdGroup bị thiếu mẫu quảng cáo -->
      <td>
        <v-dialog v-model="dialog2" width="1000">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" @click="getApi2(item.customerId)">
              <v-icon large :color="getColor2(item.numOfAdGroupMissingAds)">fiber_manual_record</v-icon>
              {{item.numOfAdGroupMissingAds}}
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="blue white--text" primary-title>AdGroup bị thiếu mẫu quảng cáo</v-card-title>
            <v-card-text>
              <v-simple-table>
                <thead>
                  <tr style="color:blue; font-size: 20px;">
                    <td width="50px">#</td>
                    <td>Tên Campain</td>
                    <td>Nhóm quảng cáo</td>
                    <td>Số quảng cáo bị thiếu</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, b) in desserts2" :key="item.id">
                    <td>{{b+1}}</td>
                    <td>{{item.campaignName}}</td>
                    <td>{{item.adGroupName}}</td>
                    <td>{{item.numOfMissingExpandedTextAds}}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog2 = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </td>
      <!-- Ad bị thiếu tiện tích mở rộng -->
      <td>
        <v-dialog v-model="dialog3" width="1000">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" @click="getApi3(item.customerId)">
              <v-icon large :color="getColor2(item.numOfAdGroupMissingExtensions)">fiber_manual_record</v-icon>
              {{item.numOfAdGroupMissingExtensions}}
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="blue white--text" primary-title>AdGroup bị thiếu tiện ích mở rộng</v-card-title>
            <v-card-text>
              <v-simple-table>
                <thead>
                  <tr style="color:blue; font-size: 20px;">
                    <td width="50px">#</td>
                    <td>Tên Campain</td>
                    <td>Nhóm quảng cáo</td>
                    <td>Call Extension</td>
                    <td>Callout Extension</td>
                    <td>Site Link Extension</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, c) in desserts3" :key="item.id">
                    <td>{{c+1}}</td>
                    <td>{{item.campaignName}}</td>
                    <td>{{item.adGroupName}}</td>
                    <td>
                      <v-icon :color="getcolorIcon(item.missingCallExtension)">{{getIcon1(item.missingCallExtension)}}
                      </v-icon>
                    </td>
                    <td>
                      <v-icon :color="getcolorIcon(item.missingCalloutExtension)">
                        {{getIcon1(item.missingCalloutExtension)}}</v-icon>
                    </td>
                    <td>
                      <v-icon :color="getcolorIcon(item.missingSiteLinkExtension)">
                        {{getIcon1(item.missingSiteLinkExtension)}}</v-icon>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog3 = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </td>
      </tr>
      </tbody>
      </v-simple-table>
    </template>
</template>
</v-card>
</template>
</div>
</template>
<script>
  import axios from "axios";
  import config from "../config";
  export default {
    data() {
      return {
        dialog1: false,
        dialog2: false,
        dialog3: false,
        desserts1: [],
        desserts2: [],
        desserts3: [],
        type: "NEAR",
        items: [{
            text: "Cảnh báo gần",
            value: "NEAR"
          },
          {
            text: "Cảnh báo xa",
            value: "FAR"
          }
        ],
        data: [],
        header: [{
            text: '#'
          },
          {
            text: "Mã khách hàng"
          },
          {
            text: "Tên khách hàng"
          },
          {
            text: "CLICK"
          },
          {
            text: "Số lượt hiển thị"
          },
          {
            text: "Ngân sách"
          },
          {
            text: "POSITION"
          },
          {
            text: "Số chuyển đổi"
          },
          {
            text: "Giá trị chuyển đổi"
          },
          {
            text: "Tỷ lệ chuyển đổi"
          },
          {
            text: "CPA"
          },
          {
            text: "ROAS"
          },
          {
            text: "Tỷ lệ hiển thị so khớp chính xác"
          },
          {
            text: "Tỷ lệ hiển thị bị mất (xếp hạng)"
          },
          {
            text: "Tỷ lệ hiển thị bị mất (ngân sách)"
          },
          {
            text: "Tỷ lệ hiển thị bị mất (xếp hạng)"
          },
          {
            text: "Ngân sách còn lại "
          },
          {
            text: "Thời gian tải trang (s)"
          },
          {
            text: "Quảng cáo bị từ chối"
          },
          {
            text: "AdGroup bị thiếu mẫu quảng cáo"
          },
          {
            text: "AdGroup bị thiếu tiện ích mở rộng"
          }
        ],
        desserts: [],
        dialog4: false,
        desserts4: [{
            name: 'null',
            calories: 'impression.change.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'click.change.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'spend.change.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'position.change.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'is.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'exact.is.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'lost.budget.is.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'lost.rank.is.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'page.load.time.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'pageoad.time.change.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'conversion.change.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'conversion.rate.change.threshold',
            value: -10
          },
          {
            name: 'null',
            calories: 'cpa.change.threshold',
            value: -10
          },
        ]
      };
    },
    methods: {
      getIcon1(data) {
        if (data == true) {
          return "done";
        } else return "clear";
      },

      getcolorIcon(data) {
        if (data == true) {
          return "green";
        } else return "red";
      },
      //format Số
      formatNumber(data) {
        var x = new Intl.NumberFormat("es-ES", {
          maximumFractionDigits: 2
        });
        if (data > 1000000) {
          data = data / 1000000;
        }
        var y = x.format(data);
        return y;
      },
      getColor(isWarning) {
        if (isWarning) {
          return "red";
        } else return "green";
      },
      //format currency
      getCurrency(type, type1) {
        if (type == "SPEND" || type == "REMAIN_BUDGET") {
          return type1;
        } else return null;
      },
      //format %
      getPercent(type) {
        if (
          type == "CR" ||
          type == "EXACT_IS" ||
          type == "IS" ||
          type == "BUDGET_LOST_IS" ||
          type == "RANK_LOST_IS"
        ) {
          return "%";
        }
      },
      getColor1(changeValue) {
        if (changeValue > 0) {
          return "green";
        } else return "red";
      },

      getIcon(changeValue) {
        if (changeValue > 0) {
          return "trending_up";
        } else {
          return "trending_down1";
        }
      },
      getColor2(color) {
        if (color == 0) {
          return "green";
        } else return "red";
      },
      // checktrackingDetail(trackingDetail){
      //   if (trackingDetail == null) {
      //     return null
      //   } else return trackingDetail
      // },
      getApi() {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        const userId = JSON.stringify(user.userId);
        console.log(userId);
        const url = `${config.apiUrl}${userId}/account-tracking`;
        axios
          .get(url, {
            params: {
              type: this.type
            },
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            this.desserts = response.data.response;
          });
      },
      // mới1
      getApi1(data) {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        const userId = JSON.stringify(user.userId);
        console.log(userId);
        const url = `${config.apiUrl}${userId}/disapproved-ads`;
        axios
          .get(url, {
            params: {
              cId: data
            },
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            this.desserts1 = response.data.response;
          });
      },
      //mới 2
      getApi2(data) {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        const userId = JSON.stringify(user.userId);
        console.log(userId);
        const url = `${config.apiUrl}${userId}/missing-ads`;
        axios
          .get(url, {
            params: {
              cId: data
            },
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            this.desserts2 = response.data.response;
          });
      },
      //mới 3
      getApi3(data) {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        const userId = JSON.stringify(user.userId);
        console.log(userId);
        const url = `${config.apiUrl}${userId}/missing-extensions`;
        axios
          .get(url, {
            params: {
              cId: data
            },
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            this.desserts3 = response.data.response;
          });
      },
      changeType: function () {
        this.type = "FAR";
      }
    },
    created() {
      this.getApi();
    },
    watch: {
      type() {
        this.getApi();
      }
    }
  };
</script>
<style>
  .table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid rgb(255, 255, 255);
    table-layout: fixed;
    white-space: nowrap;
  }

  .table th {
    background-color: rgb(189, 199, 209)
  }

  table,
  th,
  td {
    border: 1px solid rgb(248, 238, 238);
  }

  table {
    border-collapse: collapse;
  }

  .custom-select {
    background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 90% 0;
    height: 29px;
    overflow: hidden;
    width: 200px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-right: 20px;
    margin-bottom: 15px;
    /* color: rgb(232, 232, 248); */
    font-size: 18px;
  }
</style>