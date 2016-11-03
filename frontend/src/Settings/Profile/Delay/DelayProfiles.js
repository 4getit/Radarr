import React, { Component, PropTypes } from 'react';
import Measure from 'react-measure';
import autobind from 'autobind-decorator';
import FieldSet from 'Components/FieldSet';
import Icon from 'Components/Icon';
import Link from 'Components/Link';
import PageSectionContent from 'Components/Page/PageSectionContent';
import DelayProfileDragSource from './DelayProfileDragSource';
import DelayProfileDragPreview from './DelayProfileDragPreview';
import DelayProfile from './DelayProfile';
import EditDelayProfileModalConnector from './EditDelayProfileModalConnector';
import styles from './DelayProfiles.css';

class DelayProfiles extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isAddDelayProfileModalOpen: false,
      width: 0
    };
  }

  //
  // Listeners

  @autobind
  onAddDelayProfilePress() {
    this.setState({ isAddDelayProfileModalOpen: true });
  }

  @autobind
  onModalClose() {
    this.setState({ isAddDelayProfileModalOpen: false });
  }

  @autobind
  onMeasure({ width }) {
    this.setState({ width });
  }

  //
  // Render

  render() {
    const {
      defaultProfile,
      items,
      tagList,
      dragIndex,
      dropIndex,
      onConfirmDeleteDelayProfile,
      ...otherProps
    } = this.props;

    const {
      isAddDelayProfileModalOpen,
      width
    } = this.state;

    const isDragging = dropIndex !== null;
    const isDraggingUp = isDragging && dropIndex < dragIndex;
    const isDraggingDown = isDragging && dropIndex > dragIndex;

    return (
      <Measure onMeasure={this.onMeasure}>
        <FieldSet
          legend="Delay Profiles"
        >
          <PageSectionContent
            errorMessage="Unable to load Delay Profiles"
            {...otherProps}
          >
            <div className={styles.delayProfilesHeader}>
              <div className={styles.column}>Protocol</div>
              <div className={styles.column}>Usenet Delay</div>
              <div className={styles.column}>Torrent Delay</div>
              <div className={styles.tags}>Tags</div>
            </div>

            <div>
              {
                items.map((item, index) => {
                  return (
                    <DelayProfileDragSource
                      key={item.id}
                      tagList={tagList}
                      {...item}
                      {...otherProps}
                      index={index}
                      isDragging={isDragging}
                      isDraggingUp={isDraggingUp}
                      isDraggingDown={isDraggingDown}
                      onConfirmDeleteDelayProfile={onConfirmDeleteDelayProfile}
                    />
                  );
                })
              }

              <DelayProfileDragPreview
                width={width}
              />
            </div>

            {
              defaultProfile &&
                <div>
                  <DelayProfile
                    tagList={tagList}
                    isDragging={false}
                    onConfirmDeleteDelayProfile={onConfirmDeleteDelayProfile}
                    {...defaultProfile}
                  />
                </div>
            }

            <div className={styles.addDelayProfile}>
              <Link
                className={styles.addButton}
                onPress={this.onAddDelayProfilePress}
              >
                <Icon name="icon-sonarr-add" />
              </Link>
            </div>

            <EditDelayProfileModalConnector
              isOpen={this.state.isAddDelayProfileModalOpen}
              onModalClose={this.onModalClose}
            />
          </PageSectionContent>
        </FieldSet>
      </Measure>
    );
  }
}

DelayProfiles.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  defaultProfile: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  tagList: PropTypes.arrayOf(PropTypes.object).isRequired,
  dragIndex: PropTypes.number,
  dropIndex: PropTypes.number,
  onConfirmDeleteDelayProfile: PropTypes.func.isRequired,
};

export default DelayProfiles;