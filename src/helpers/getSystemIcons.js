import {
  PieChartOutlined,
  AppstoreAddOutlined,
  ShopOutlined,
  LaptopOutlined,
  GoldOutlined,
  SettingOutlined,
  GlobalOutlined,
  MoneyCollectOutlined,
  DropboxOutlined,
  BranchesOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
  CalendarOutlined,
  EuroCircleOutlined,
  TranslationOutlined,
  ProjectOutlined,
  DatabaseOutlined,
  ToolOutlined,
  DisconnectOutlined,
  OrderedListOutlined,
  FormOutlined,
  WalletOutlined,
  UsergroupAddOutlined,
  QuestionCircleOutlined,
  TransactionOutlined,
  MessageOutlined,
  LockOutlined,
  PaperClipOutlined,
  StarOutlined,
  SkinOutlined,
  BookOutlined,
  CloudUploadOutlined,
  FireOutlined,
  DollarOutlined,
  TrophyOutlined,
  InstagramOutlined,
  CopyrightOutlined,
  LogoutOutlined,
  GiftOutlined,
  BarChartOutlined,
  FundViewOutlined,
  RiseOutlined,
  RadarChartOutlined,
  BoxPlotOutlined,
  SlidersOutlined,
  StockOutlined,
  PlusOutlined,
  ThunderboltOutlined,
  MailOutlined,
  GroupOutlined,
  UngroupOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  SnippetsOutlined,
  QrcodeOutlined,
  CheckOutlined,
  AreaChartOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { FiClock, FiImage } from 'react-icons/fi';
import { HiOutlineChartBar, HiOutlineClipboardList } from 'react-icons/hi';
import {
  BsBarChart,
  BsCalendarCheck,
  BsClockHistory,
  BsFillDiagram3Fill,
  BsImage,
  BsLightningCharge,
} from 'react-icons/bs';
import {
  MdNotificationAdd,
  MdDeliveryDining,
  MdOutlineEmail,
  MdOutlineFastfood,
  MdOutlineNotificationsActive,
  MdOutlinePayment,
} from 'react-icons/md';
import { ImStatsDots, ImSubscript2 } from 'react-icons/im';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { RiFileSettingsLine, RiGalleryFill } from 'react-icons/ri';
import {
  TbTruckDelivery,
  TbSitemap,
  TbTriangleSquareCircle,
  TbBrandAirtable,
} from 'react-icons/tb';
import { AiOutlineClear, AiOutlineFieldTime } from 'react-icons/ai';
import { HiOutlinePuzzle } from 'react-icons/hi';
import { BiCategoryAlt, BiMapPin } from 'react-icons/bi';
import { GiPayMoney } from 'react-icons/gi';
import { GrAppleAppStore } from 'react-icons/gr';
import { BiKnife } from 'react-icons/bi';

export default function getSystemIcons(icon) {
  switch (icon) {
    case 'dashboard':
      return <PieChartOutlined />;
    case 'GrGallery':
      return <RiGalleryFill />;
    case 'shop':
      return <ShopOutlined />;
    case 'gold':
      return <GoldOutlined />;
    case 'dropbox':
      return <MdOutlineFastfood />;
    case 'appStoreAdd':
      return <AppstoreAddOutlined />;
    case 'laptop':
      return <LaptopOutlined />;
    case 'appStore':
      return <BiCategoryAlt />;
    case 'settings':
      return <SettingOutlined />;
    case 'global':
      return <GlobalOutlined />;
    case 'moneyCollect':
      return <MoneyCollectOutlined />;
    case 'branches':
      return <BranchesOutlined />;
    case 'branchesOutlined':
      return <BranchesOutlined />;
    case 'user':
      return <UserOutlined />;
    case 'userSwitch':
      return <UserSwitchOutlined />;
    case 'userAdd':
      return <UserAddOutlined />;
    case 'calendar':
      return <CalendarOutlined />;
    case 'euroCircle':
      return <EuroCircleOutlined />;
    case 'translation':
      return <TranslationOutlined />;
    case 'project':
      return <ProjectOutlined />;
    case 'database':
      return <DatabaseOutlined />;
    case 'tool':
      return <ToolOutlined />;
    case 'disconnect':
      return <DisconnectOutlined />;
    case 'orderedList':
      return <OrderedListOutlined />;
    case 'form':
      return <FormOutlined />;
    case 'wallet':
      return <WalletOutlined />;
    case 'userGroupAdd':
      return <UsergroupAddOutlined />;
    case 'questionCircle':
      return <QuestionCircleOutlined />;
    case 'transaction':
      return <TransactionOutlined />;
    case 'fiShoppingCart':
      return <ShoppingCartOutlined />;
    case 'CaretUpOutlined':
      return <HiOutlineChartBar style={{ marginRight: '13px' }} />;
    case 'caretUp':
      return <BsBarChart />;
    case 'careerCategory':
      return <BiCategoryAlt />;
    case 'RiPageSeparator':
      return <SnippetsOutlined />;
    case 'OrderedListOutlined':
      return <OrderedListOutlined />;
    case 'CiViewBoard':
      return <HiOutlineClipboardList />;
    case 'fiImage':
      return <FiImage />;
    case 'bsImage':
      return <BsImage />;
    case 'deliveryDining':
      return <MdDeliveryDining />;
    case 'thunderbolt':
      return <ThunderboltOutlined />;
    case 'notificationsActive':
      return <MdOutlineNotificationsActive />;
    case 'imSubscript':
      return <ImSubscript2 />;
    case 'CarOutlined':
      return <CarOutlined />;
    case 'message':
      return <MessageOutlined />;
    case 'lock':
      return <LockOutlined />;
    case 'paperClip':
      return <PaperClipOutlined />;
    case 'star':
      return <StarOutlined />;
    case 'skin':
      return <SkinOutlined />;
    case 'book':
      return <BookOutlined />;
    case 'cloudUpload':
      return <CloudUploadOutlined />;
    case 'fire':
      return <FireOutlined />;
    case 'dollar':
      return <DollarOutlined />;
    case 'trophy':
      return <TrophyOutlined />;
    case 'instagram':
      return <InstagramOutlined />;
    case 'copyright':
      return <CopyrightOutlined />;
    case 'logout':
      return <LogoutOutlined />;
    case 'BsClockHistory':
      return <BsClockHistory />;
    case 'RiFileSettingsLine':
      return <RiFileSettingsLine />;
    case 'GiftOutlined':
      return <GiftOutlined />;
    case 'MdNotificationAdd':
      return <MdNotificationAdd />;
    case 'emailSettings':
      return <MdOutlineEmail />;
    case 'TbReceiptRefund':
      return <HiOutlineReceiptRefund />;
    case 'report':
      return <BarChartOutlined />;
    case 'overview':
      return <FundViewOutlined />;
    case 'products':
      return <DropboxOutlined />;
    case 'revenue':
      return <RiseOutlined />;
    case 'orders':
      return <RadarChartOutlined />;
    case 'variation':
      return <BoxPlotOutlined />;
    case 'categories':
      return <SlidersOutlined />;
    case 'stock':
      return <StockOutlined />;
    case 'TbTruckDelivery':
      return <TbTruckDelivery />;
    case 'TbTruckDelivery2':
      return <TbTruckDelivery className='mr-2' />;
    case 'TbSitemap':
      return <TbSitemap />;
    case 'AiOutlineClear':
      return <AiOutlineClear />;
    case 'SlPuzzle':
      return <HiOutlinePuzzle />;
    case 'ImStatsDots':
      return <ImStatsDots />;
    case 'extras':
      return <PlusOutlined />;
    case 'referral':
      return <BsFillDiagram3Fill />;
    case 'mail':
      return <MailOutlined />;
    case 'moneyOut':
      return <GiPayMoney />;
    case 'moneyOut2':
      return <GiPayMoney className='mr-2' />;
    case 'groupOutlined':
      return <GroupOutlined />;
    case 'unGroupOutlined':
      return <UngroupOutlined />;
    case 'GrAppleAppStore':
      return <GrAppleAppStore />;
    case 'lightning':
      return <BsLightningCharge />;
    case 'clock':
      return <FiClock />;
    case 'payload':
      return <MdOutlinePayment />;
    case 'recept':
      return <TbTriangleSquareCircle />;
    case 'BookOutlined':
      return <BookOutlined />;
    case 'BsCalendarCheck':
      return <BsCalendarCheck />;
    case 'BiMapPin':
      return <BiMapPin />;
    case 'MdOutlineTableBar':
      return <TbBrandAirtable />;
    case 'AiOutlineFieldTime':
      return <AiOutlineFieldTime />;
    case 'QrcodeOutlined':
      return <QrcodeOutlined />;
    case 'knife':
      return <BiKnife />;
    case 'check':
      return <CheckOutlined />;
    case 'SmileOutlined':
      return <SmileOutlined />;
    case 'AreaChartOutlined':
      return <AreaChartOutlined />;
    default:
      break;
  }
}
