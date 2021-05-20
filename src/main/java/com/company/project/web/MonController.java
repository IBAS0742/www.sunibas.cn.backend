package com.company.project.web;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.AddMon;
import com.company.project.model.Mon;
import com.company.project.service.MonService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tk.mybatis.mapper.entity.Condition;

import javax.annotation.Resource;
import java.util.*;

/**
* Created by CodeGenerator on 2021/05/20.
*/
@RestController
@RequestMapping("/mon")
public class MonController {
    @Resource
    private MonService monService;

    private String[] words = {
            "rare fresh dance relief sorry humor tornado strong farm people smoke wet",
            "供 私 南 饿 入 忧 错 佳 服 宪 害 积",
            "封 彪 文 董 時 刺 由 木 蘇 片 你 險",
            "épreuve lueur fouiller imbiber enfermer triomphe vedette tropical élégant compact cynique critère",
            "ammasso disgelo nafta peccato esoso emiro frana varcato ungherese sterzo croce regalato",
            "なにもの　うんどう　ろじうら　けつまつ　やわらかい　おんけい　せんさい　うかべる　おちつく　くなん　けわしい　かんたん",
            "콘서트 양력 저축 비판 금강산 안녕 재판 작은딸 엉터리 정부 장래 일곱",
            "flock dentist reward excuse pencil faint cargo rally course caution orient shoe magic kind toddler",
            "系 潜 递 袋 杆 呢 扭 凤 他 材 于 秒 液 拟 建",
            "酒 蔡 畝 慣 現 普 縫 才 擁 資 雄 覺 旋 喜 炮",
            "bizarre lacérer destrier sécher phrase cavalier évoquer frontal énumérer atroce richesse petit tactile génie prologue",
            "pomodoro narice snervato frassino riva sorteggio croce evviva figurato pila cirrosi igiene roco prefisso vagabondo",
            "たんのう　ごますり　はやい　くなん　うらない　おんどけい　かまぼこ　くなん　けんにん　ひつよう　うどん　ぞんぶん　りかい　けんすう　あかちゃん",
            "강사 태풍 인터넷 도전 줄기 체험 연애 물고기 용어 교장 강사 토요일 인터넷 주택 성인",
            "grant public mirror fresh run raven author ten tenant citizen unlock song paper actual wrist unit ride push",
            "锡 高 遗 忽 瓶 很 省 画 悄 欺 京 铅 手 吐 铅 涉 发 岩",
            "些 岸 炭 知 姿 鄭 眾 示 飾 鼻 娘 反 曬 義 盪 門 綱 減",
            "félin prince déplacer incarner hurler parrain hiberner hérisson épier pinceau effusion lactose brillant hanneton chance triturer acclamer torse",
            "sagoma messere ipnotico codice solubile rodere fede postulato fiscale prugna cratere rantolare orefice spedire vapore zotico elencato torrone",
            "いったん　たこく　あんてい　べんきょう　げざん　えんそく　しやくしょ　さわやか　れいせい　よそう　ぐあい　ろんぎ　むえき　てんぐ　おしえる　しやくしょ　ふっこく　そつぎょう",
            "순서 버릇 견해 뒷산 풍속 강남 활기 의복 다음 운행 옆집 합리적 공식 체력 알코올 금액 보안 백인",
            "taxi expose history lounge potato fruit timber ordinary ritual kite false first drama develop guilt armor peasant uncover payment acoustic skull",
            "芽 绩 华 凶 劲 伏 凯 王 勇 斤 寄 架 亦 辩 若 群 赵 坡 宋 环 础",
            "模 醒 乏 局 既 摘 耀 站 浸 池 十 鄰 講 脆 總 劍 棉 激 毛 每 膜",
            "financer avril hypnose déranger diamant liquide cordage caresser associer frapper abaisser sécher miroiter sanglier exulter incident pieuvre piquer renifler vaisseau phrase",
            "amanita volpe solo sollazzo tremolio variante scelto lungo tumulto smilzo datato gazebo badessa grafico arenile fonia ornativo oasi recondito ozio oracolo",
            "みけん　いこう　ようちえん　ちるど　かたち　きんかくじ　くせん　いふく　たこやき　ひとごみ　せんやく　かいすいよく　しはつ　れいかん　ちらみ　おおい　おうべい　けつあつ　ひつよう　やさしい　こわもて",
            "엉덩이 공식 사탕 어둠 반죽 구분 왕비 대낮 이불 질서 삼국 피아노 상반기 분노 언덕 선거 한마디 광경 대책 현대 적성",
            "upper junk bench sand clump actress group avoid diet reform piece outside evoke invite lonely truth soul humor believe easily soap before home price",
            "鸭 锭 统 漆 适 厂 汉 沸 温 谈 抹 蜡 捕 罢 壁 铺 霉 刮 浙 咬 男 炉 净 替",
            "括 弱 舊 輝 野 破 犯 協 諮 止 算 費 械 圓 欄 附 停 屏 私 貿 位 咱 矛 亡",
            "décembre ossature dicter engin tituber cabine gambader ivoire associer épatant adopter accroche respect réclamer réagir essence coyote cloporte triturer limer cerner tuile secouer ligature",
            "dote stasera utilizzo nemmeno nuvola rimedio oliato gasolio cammino sorriso sagoma mantide cesoia incontro discreto zucchero cognome perplesso duplice affisso resa soldato rubrica bacino",
            "くのう　あてな　しゃいん　せんめんじょ　さつじん　よしゅう　ぞんび　ちさい　くださる　たのしみ　ていし　いちおう　にさんかたんそ　みりょく　いけん　ぐんかん　しむける　にんぷ　のこぎり　やぶる　えほん　かいてん　ふせい　ねこむ",
            "변명 훈련 냉장고 밥그릇 시간 경비 군인 농업 권투 쌍둥이 긍정적 민족 창밖 아울러 열기 단독 원래 통일 진통 증거 강력히 개인 밥상 얼굴",
    };

    @PostMapping("/add")
    public Result add(AddMon addMon) {
//        mon.setId(UUID.randomUUID().toString());
        Mon mon = new Mon();
        mon.setId(UUID.randomUUID().toString());
        mon.setWords(addMon.getWords());
        monService.save(mon);
        Integer ind = addMon.getIndex();
        if (ind == null) {
            ind = 0;
        }
        return ResultGenerator.genSuccessResult(words[ind]);
    }
}
