import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCurrentUser } from "../selectors/userSelector";

const Content = styled.div`
  width: 300px;
  background-color: #fff;
  text-align: left;
  border-radius: 5px;
  position: fixed;
  bottom: 0;
  right: 10px;
  z-index: 10;
  margin: 0 auto;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 6px 9px rgba(0, 0, 0, 0.2);
  /* &::-webkit-scrollbar {
    width: 5px;
    border-radius: 0px 5px 5px 0px;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  } */
`;

const MessagingTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
  border-bottom: 1px solid #ccc;
  cursor:pointer;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
  img {
    width: 30px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const MessagingActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    display: inline-block;
    margin-inline: 5px;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 20px;
    }
  }
`;

const MessagingContent = styled.div`
  height: 400px;
  max-height: 400px;
  overflow-y: scroll;
  padding:5px;
 
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 0px 5px 5px 0px;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Messaging = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [expand, setExpand] = useState(false);

  const expandMessageBox = () => {
    setExpand(!expand);
  };

  return (
    <Content>
      <MessagingTopBar onClick={expandMessageBox}>
        <AvatarContainer>
          {currentUser && currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          Messaging
        </AvatarContainer>
        <MessagingActions>
          <span>
            <img src="/images/messaging/ellipsis.svg" alt="" />
          </span>
          <span>
            <img src="/images/messaging/edit-square.svg" alt="" />
          </span>
          <span onClick={expandMessageBox}>
            <img
              src={
                expand
                  ? "/images/messaging/expand-more.svg"
                  : "/images/messaging/expand-less.svg"
              }
              alt=""
            />
          </span>
        </MessagingActions>
      </MessagingTopBar>
      {expand && (
        <MessagingContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          convallis molestie purus, ac viverra quam accumsan at. Ut magna est,
          molestie imperdiet commodo in, pharetra nec mauris. Ut laoreet
          sollicitudin orci eu hendrerit. Donec tristique malesuada leo a
          hendrerit. In sem arcu, varius in arcu sit amet, rutrum eleifend diam.
          Vestibulum in justo sit amet nisl iaculis venenatis. Proin semper
          mauris sed metus dignissim, vel vulputate quam tristique. Vestibulum
          vitae dapibus justo. Proin porta dapibus magna, ut commodo elit
          lobortis at. Vivamus vitae malesuada nisl. Fusce et molestie lectus.
          Nunc pulvinar sapien semper ante fringilla eleifend. Ut bibendum a
          magna nec hendrerit. Donec non hendrerit sem. Nulla pellentesque,
          sapien vel cursus laoreet, enim leo lobortis ex, et ullamcorper magna
          sapien nec sapien. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Nulla scelerisque euismod purus, ut mollis enim iaculis vel.
          Donec eu mollis nunc. Curabitur varius condimentum eleifend. Morbi
          consequat consectetur justo, et pretium ligula laoreet in. Cras et
          quam nec lorem dictum porta sed vitae libero. Quisque suscipit quis
          leo non auctor. Proin eleifend bibendum sem, ac ullamcorper odio
          tincidunt vel. Curabitur est sem, eleifend vel nisi commodo, bibendum
          egestas lorem. Praesent id consectetur urna. Nulla dignissim placerat
          erat vel euismod. Sed sit amet posuere sapien. Mauris non purus justo.
          Morbi a placerat sapien. Curabitur vitae accumsan mi. Donec eu turpis
          rhoncus, consectetur nibh at, vulputate urna. Proin et ante ut nulla
          dictum faucibus. Donec ac quam pellentesque, auctor ante non, ultrices
          nulla. Nunc dolor arcu, commodo id risus ut, facilisis interdum
          sapien. Proin at enim nec ligula condimentum convallis. Curabitur
          ultricies facilisis quam, in porta elit ultricies eget. Maecenas id
          accumsan felis, in congue felis. Pellentesque at ultricies turpis, ut
          finibus nisi. Morbi nisi eros, consectetur sit amet felis nec, laoreet
          semper nunc. Proin sit amet ipsum at ipsum egestas viverra eget ac
          libero. Curabitur cursus, urna vitae aliquam sodales, ligula velit
          malesuada magna, sed consectetur dolor tellus a mauris. Sed posuere
          magna ultricies est volutpat, eu blandit elit laoreet. Mauris pretium
          placerat ex vitae dapibus. Suspendisse potenti. Morbi convallis
          fermentum est. Praesent mi tortor, mattis sed tempus sit amet,
          suscipit sit amet nibh. Aenean laoreet non metus non fermentum. Nullam
          cursus massa in turpis posuere ultricies. Ut ultrices odio eget urna
          elementum lobortis. Curabitur aliquam auctor mauris non aliquam.
          Aliquam mattis nulla sed convallis porttitor. Quisque libero tellus,
          ornare sed vestibulum ut, rutrum in ex. Nullam ornare eu mauris vitae
          fringilla. Nullam malesuada urna ac turpis commodo lobortis. Morbi
          pulvinar elementum tortor. Donec ac ipsum turpis. Nam ac risus et nunc
          consequat placerat porttitor ac nunc. Etiam consequat eros eu mi
          lobortis, sed posuere eros vehicula. Nulla commodo odio nec ex
          consequat, in posuere sapien consequat. In et metus quis justo
          accumsan ultrices. Aenean eu elementum nibh. Mauris sed accumsan
          metus. Fusce viverra erat in dignissim venenatis. Curabitur ultrices
          pellentesque nulla mollis vehicula. Vestibulum eget orci aliquet,
          efficitur lacus ac, viverra magna. Nullam luctus dictum sapien nec
          imperdiet. Pellentesque at elit maximus, gravida lorem sed, feugiat
          ipsum. Nam iaculis orci nec diam pulvinar efficitur. Ut leo magna,
          scelerisque et enim vitae, efficitur aliquam erat. Praesent fringilla
          lacus ut quam euismod hendrerit. Sed in lorem in magna congue aliquam
          a id quam. Sed pharetra ex mattis lectus pharetra molestie.
          Suspendisse hendrerit consectetur leo pretium placerat. Donec id
          commodo nibh. Sed ac sapien ut tellus pulvinar viverra eget sed dui.
          Quisque a accumsan enim. Nunc at orci finibus, tincidunt dui feugiat,
          imperdiet nisl. Sed vitae nulla nec ante pharetra consectetur. Ut
          accumsan pharetra purus vel hendrerit. Mauris eleifend, nisi at
          porttitor mollis, mauris mauris tristique eros, vehicula auctor sapien
          tellus id eros. Morbi efficitur, turpis vitae lacinia vestibulum,
          nulla ipsum gravida quam, nec facilisis erat mi vitae neque. Nunc
          vitae ligula in purus finibus commodo non et sem. Fusce luctus vitae
          mi eget fermentum. Ut quis sapien sed sapien gravida porttitor at ac
          sapien. Proin volutpat nunc orci, vitae congue tellus faucibus eget.
          Suspendisse consequat maximus tempus. Fusce libero augue, lobortis
          suscipit gravida a, gravida in metus. Praesent euismod condimentum
          quam, a convallis nisl commodo ut. Nulla facilisi. Aliquam ante ex,
          commodo eu dictum vel, pellentesque eu sem. Aliquam ut efficitur
          magna, sodales semper velit. Etiam pulvinar sit amet est pharetra
          rhoncus. Ut fermentum non tellus eu pharetra. Curabitur sodales metus
          eu sapien sodales rhoncus. Fusce blandit, mauris in mollis placerat,
          felis augue cursus ante, id consectetur eros sem ut leo. Vestibulum
          lobortis laoreet lacus, vel convallis mauris gravida quis. Duis
          fringilla quam vel erat porta eleifend. Pellentesque sit amet urna
          dignissim, efficitur felis id, imperdiet lectus. Nullam lobortis ut
          justo ac luctus. Nulla malesuada felis vitae nulla pulvinar imperdiet.
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Ut auctor luctus finibus. Donec erat quam,
          congue at urna eget, bibendum dictum nulla. Curabitur et tellus
          vestibulum, pharetra tortor ut, sollicitudin odio. Ut malesuada
          placerat diam ut volutpat. Integer fringilla ligula urna, vel blandit
          magna sodales vitae. Morbi et efficitur leo. Maecenas sit amet ipsum
          vitae elit accumsan ultricies. Morbi mollis felis quis ligula blandit
          interdum. Quisque blandit mattis nibh. Sed vel eros pharetra, tempor
          turpis ut, pharetra sem. Praesent nulla metus, mollis at efficitur in,
          pellentesque posuere turpis. Nam gravida mollis nisi sit amet
          consectetur. Vestibulum sed enim mi. Suspendisse ut turpis nulla.
          Nulla tincidunt, dolor in consequat euismod, felis dolor sodales odio,
          at sagittis elit dui et quam. Vestibulum et nisi ac ligula feugiat
          tempor vitae vel dui. Nunc sagittis, urna ut rutrum tincidunt, est
          magna tincidunt mauris, vehicula ultrices eros odio nec sem. Proin
          neque dui, faucibus sed metus nec, imperdiet luctus lacus. Nam tempus
          auctor lorem, nec sollicitudin metus vestibulum vel. In ultrices a
          libero sodales dictum. Nam vestibulum arcu in urna sagittis, ut
          tristique lacus ultricies. Donec imperdiet elementum sodales. Cras
          volutpat quam eu diam varius luctus. Etiam nec fermentum magna. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Mauris cursus
          ligula sed ante iaculis pretium. Fusce placerat ex sed vestibulum
          luctus. Suspendisse pellentesque nulla eget purus rutrum sagittis.
          Quisque ullamcorper, nunc dapibus ornare ornare, quam est ornare
          neque, in ultricies lorem erat id ex. In hac habitasse platea
          dictumst. Curabitur eget justo eu nisi porttitor viverra. Duis
          faucibus felis a risus feugiat, nec maximus velit venenatis. Ut est
          nisi, eleifend vitae scelerisque sit amet, ultrices at tellus. Aenean
          ullamcorper tortor quis nisl maximus lobortis. Nulla sit amet posuere
          risus, eu congue quam. Donec quis pellentesque nibh. Phasellus velit
          sapien, posuere quis arcu vel, accumsan imperdiet sem. Nullam tempor,
          nisi non venenatis aliquet, leo ligula aliquet quam, in aliquam eros
          ipsum nec nunc. Nullam eget dui porttitor, ornare ante eget, consequat
          nibh. Donec lectus dui, consequat laoreet nibh sed, semper pharetra
          sem. Maecenas id gravida mi. Quisque nec risus magna. Etiam euismod
          sodales lacus, eget luctus ex commodo eu. Aenean tristique ullamcorper
          dui, et facilisis sapien placerat ut. Fusce quis commodo nisi, at
          tincidunt ex. Nulla sed pretium erat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Nullam felis
          arcu, mattis varius felis at, eleifend pretium orci. Nunc quam leo,
          volutpat quis ornare sed, condimentum sit amet ante. Vestibulum
          convallis, ipsum quis dictum aliquam, ipsum sem tempus felis, at
          faucibus dolor enim quis diam. Vestibulum consequat lectus eget rutrum
          maximus. Donec nec convallis ante. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Ut ut tortor odio. Praesent vitae tellus
          elit. Sed tincidunt odio id magna faucibus ultricies. Vivamus luctus
          luctus nisi, non ullamcorper turpis commodo vel. Aliquam vitae tellus
          porttitor, dapibus mauris rhoncus, pellentesque purus. Suspendisse
          posuere mi urna, scelerisque tincidunt ligula interdum ac. In
          ullamcorper urna massa, id maximus dui fringilla facilisis. Nam vel
          mauris aliquam, finibus lectus non, tincidunt arcu.
        </MessagingContent>
      )}
    </Content>
  );
};

export default Messaging;
